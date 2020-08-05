import { Component, OnInit } from '@angular/core';

import { InstagramService } from './services/instagram.service';
import { MessageService } from './services/message.service';
import { ProfileData } from './models/profile-data.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	
	public profiles: ProfileData[] = [];
	public activePage: string;

	constructor(private instagram: InstagramService, private message: MessageService) { }
	
	ngOnInit() {
		this.activePage = "instagram";
		
		this.message.selectAboutAnnounced$.subscribe(
			() => this.activePage = "about"
		);

		this.message.selectHomeAnnounced$.subscribe(
			() => this.activePage = "instagram"
		);

		this.message.profilePostsRequestAnnounced$.subscribe(
			profiles => {
				let count = profiles.length;
				profiles.forEach(profile => {
					this.instagram.getPosts(profile).subscribe(
						() => {
							if (--count === 0) {
								this.message.announceProfilePostsReponse();
							}
						}
					);
				});
			}
		);

		this.instagram.getProfiles().subscribe(profiles => this.profiles = profiles);
	}
}
