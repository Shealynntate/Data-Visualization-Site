import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProfileData } from '../models/profile-data.model';
import { PostData } from '../models/post-data.model';

@Injectable({
	providedIn: 'root'
})
export class InstagramService {

	dataUrl = 'api/data';  // URL to web api
	private profileCollection: AngularFirestoreCollection<ProfileData>;

	constructor(private http: HttpClient,
		private storage: AngularFirestore, /*httpErrorHandler: HttpErrorHandler*/) { }

	getProfiles(): Observable<ProfileData[]> {
		this.profileCollection = this.storage.collection<ProfileData>('instagram_profiles');

		const profiles$ = this.profileCollection.valueChanges()
			.pipe(map(profiles => profiles.map(profile => {
				const profileData = new ProfileData().deserialize(profile);
				return profileData;
			}
		)));
		
		return profiles$;
	}

	getPosts(profile: ProfileData): Observable<void> {
		const postCollection = this.profileCollection.doc(profile.handle).collection('posts');

		return postCollection.valueChanges().pipe(map(
			postDocs => {
				let posts: any[] = [];
				postDocs.forEach(doc => posts = posts.concat(doc.posts));
				profile.setPosts(posts.map(post => new PostData().deserialize(post)));
			}
		));
	}

	handleError(method: string, data: any) {
		console.log('error', method, data);
	}
}
