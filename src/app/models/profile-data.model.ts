
import { PostData } from './post-data.model';

export class ProfileData {

	public category: string;
	public handle: string;
	public profilePic: string;
	public name: string;
	public followers: number;
	public averageLikes: number;
	public posts: PostData[];

	private static _startDate: Date;
	private static _endDate: Date;

	// ------------------------------------------------------------
	public deserialize(data: any): this {
		Object.assign(this, data);
		this.posts = [];
		// Set default dates
		this.startDate = new Date('01 01 2020');
		this.endDate = new Date(Date.now());

		return this;
	}

	public getPostsBetweenDates(start: Date, end: Date): PostData[] {
		return this.posts.filter(post => start <= post.date && post.date <= end);
	}

	public getPosts(): PostData[] {
		return this.posts.filter(post => ProfileData._startDate <= post.date && post.date <= ProfileData._endDate);
	}

	public setPosts(posts: PostData[]): void {
		this.posts = posts;
		this.sortPostsByDate();
	}

	public followersToString(): string {
		let count = this.followers;
		if (count >= 1000000) {
			return Math.trunc(count/1000000) + 'm';
		}
		if (count >= 1000) {
			return Math.trunc(count/1000) + 'k';
		}

		return count.toString();
	}

	// Date Functions
	// ------------------------------------------------------------
	public get startDate(): Date {
		return ProfileData._startDate;
	}
	
	public set startDate(value: Date) {
		ProfileData._startDate = value;
	}

	public get endDate(): Date {
		return ProfileData._endDate;
	}
	
	public set endDate(value: Date) {
		ProfileData._endDate = value;
	}

	public getEarliestDate(): Date {
		return this.posts.length ? this.posts[0].date : new Date();
	}

	public getLatestDate(): Date {
		return this.posts.length ? this.posts[this.posts.length-1].date : new Date();
	}

	// Helper Functions
	// ------------------------------------------------------------
	private sortPostsByDate(): void {
		this.posts.sort((a, b) => a.date.valueOf() - b.date.valueOf());
	}
}