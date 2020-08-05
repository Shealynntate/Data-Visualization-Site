import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ProfileData } from '../models/profile-data.model';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	// Subjects
	// ------------------------------------------------------------
	private igProfileDataSource = new Subject<ProfileData>();
	private refreshChartDataSource = new Subject<void>();
	private selectHomeSource = new Subject<void>();
	private selectAboutSource = new Subject<void>();
	private profilePostsRequestSource = new Subject<ProfileData[]>();
	private profilePostsResponseSource = new Subject<void>();

	// Observables
	// ------------------------------------------------------------
	public igProfileDataAnnounced$ = this.igProfileDataSource.asObservable();
	public refreshChartDataAnnounced$ = this.refreshChartDataSource.asObservable();
	public selectHomeAnnounced$ = this.selectHomeSource.asObservable();
	public selectAboutAnnounced$ = this.selectAboutSource.asObservable();
	public profilePostsRequestAnnounced$ = this.profilePostsRequestSource.asObservable();
	public profilePostsResponseAnnounced$ = this.profilePostsResponseSource.asObservable();

	// Messaging Methods
	// ------------------------------------------------------------
	public announceIGProfileData(data: ProfileData): void {
		this.igProfileDataSource.next(data);
	}

	public announceRefreshChartData(): void {
		this.refreshChartDataSource.next();
	}

	public announceSelectHome(): void {
		this.selectHomeSource.next();
	}

	public announceSelectAbout(): void {
		this.selectAboutSource.next();
	}

	public announceProfilePostsRequest(profiles: ProfileData[]): void {
		this.profilePostsRequestSource.next(profiles);
	}

	public announceProfilePostsReponse(): void {
		this.profilePostsResponseSource.next();
	}
}
