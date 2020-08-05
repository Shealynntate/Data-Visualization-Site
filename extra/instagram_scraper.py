import os, sys, json, time, requests, pytz, firebase_admin
from firebase_admin import credentials, firestore
from instaloader import Instaloader, Profile
from datetime import datetime, date
# import dateutil.relativedelta
from lxml import html

# Global Constants
# ------------------------------------------------------------
config_file = 'instagram_config.json'
config = {}

# Firebase Functionality
# ------------------------------------------------------------
def connect_to_firebase(config):
	cred = credentials.Certificate('credentials.json')
	# cred = credentials.ApplicationDefault()
	firebase_admin.initialize_app(cred, {
		'databaseURL': config['firebase_info']['databaseURL'],
		'projectId': config['firebase_info']['projectId'],
		'databaseAuthVariableOverride': {
			'uid': 'my-service-worker'
        }
	})
	db = firestore.client()
	return db.collection('instagram_profiles')

def does_account_exist(storage, handle):
	profile_ref = storage.document(handle)
	return profile_ref.get().exists

def write_profile_to_db(config, category, storage, handle, profile):
	profile_ref = storage.document(handle)
	profile_ref.set({'followers': profile['followers'], 'handle': handle, 'profilePic': profile['profile_pic_url'], 'name': profile['full_name'], 'category': category})
	write_posts_to_db(config, profile_ref, profile['posts'])

def write_posts_to_db(config, profile_ref, posts):
	doc_ref = None
	max_post_doc_size = config['max_post_doc_size']
	query = profile_ref.collection('posts').where('count', '<', max_post_doc_size)
	for snapshot in query.stream():
		doc_ref = snapshot
	while len(posts) > 0:
		if doc_ref is None:
			doc_ref = profile_ref.collection('posts').document()
			data = add_posts_to_doc(max_post_doc_size, doc_ref.get().to_dict(), posts)
			doc_ref.set(data)
		else:
			data = add_posts_to_doc(max_post_doc_size, doc_ref.to_dict(), posts)
			doc_ref.reference.set(data)
		doc_ref = None

def add_posts_to_doc(max_size, doc_data, posts):
	if doc_data is None:
		doc_data = {
			'posts': [],
			'count': 0,
			'startDate': posts[0]['date']
		}
	count = min(max_size - doc_data['count'], len(posts))
	stored_posts = doc_data['posts']
	posts_to_remove = []
	for index in range(count):
		post = posts[index]
		stored_posts.append(post)
		posts_to_remove.append(post)
		doc_data['endDate'] = post['date']
	doc_data['count'] = doc_data['count'] + count
	for post in posts_to_remove:
		posts.remove(post)

	return doc_data

def get_most_recent_post_date(storage, handle):
	profile_ref = storage.document(handle)
	if not profile_ref.get().exists:
		return None

	query = profile_ref.collection('posts').order_by('endDate', direction=firestore.Query.DESCENDING).limit(1)
	for snapshot in query.stream():
		post = snapshot.to_dict()['posts'][-1]
		return post['date']
	return None

# Instaloader Functionality
# ------------------------------------------------------------
def collect_data_for_handle(config, instance, handle, cutoff_date=None):
	post_data = []
	post_model = config['post_model']
	profile = Profile.from_username(instance.context, handle)
	earliest_date = pytz.UTC.localize(datetime.strptime(config['start_date'], '%d/%m/%y'))
	print('About to process %d posts for account %s' % (profile.mediacount, handle))

	for post in profile.get_posts():
		date = pytz.UTC.localize(post.date)
		if date < earliest_date or (cutoff_date and date <= cutoff_date):
			continue

		data = {}
		for key, field in post_model.items():
			data[key] = getattr(post, field)
		post_data.append(data)
	post_data.sort(key=lambda entry: entry['date'])
	print('Found %d new posts for account' %  len(post_data))

	return {'followers': profile.followers, 'full_name': profile.full_name, 'profile_pic_url': profile.profile_pic_url, 'posts': post_data}

# ------------------------------------------------------------
def main():
	print('Loading Config...')
	with open(config_file) as data:
		config = json.load(data)

	print('Connecting to Firebase...')
	firebase_storage = connect_to_firebase(config)

	print('Connecting to Instagram...')
	instagram_instance = Instaloader()

	for section in config['accounts']:
		for handle in section['handles']:
			print('Processing account %s' % handle)
			cutoff_date = get_most_recent_post_date(firebase_storage, handle)
			print('Most recent stored post date is %s' % str(cutoff_date))
			profile_data = collect_data_for_handle(config, instagram_instance, handle, cutoff_date)
			print ('Writing profile data to Firebase')
			write_profile_to_db(config, section['category'], firebase_storage, handle, profile_data)


if __name__ == "__main__":
	main()
	print('Program has completed')