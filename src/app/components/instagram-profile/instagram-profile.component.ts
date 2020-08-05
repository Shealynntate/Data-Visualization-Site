import { Component, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Options } from 'ng5-slider';

import { MessageService } from '../../services/message.service';
import { ProfileData } from '../../models/profile-data.model';

@Component({
	selector: 'instagram-profile',
	templateUrl: './instagram-profile.component.html',
	styleUrls: ['./instagram-profile.component.scss']
})
export class InstagramProfileComponent {

	@Input() data: ProfileData;

	private subscription = new Subscription();

	constructor(private message: MessageService) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.data) { 
			return;
		}

		this.data.startDate = new Date("01 01 2020");
		this.data.endDate = new Date();
	}

	onDateChange(): void {
		this.message.announceRefreshChartData();
	}

	getHandle(): string {
		return this.data ? this.data.handle : '';
	}

	getFollowers(): string {
		return this.data ? this.data.followersToString() : '-';
	}

	getImgURL(): string {
		return this.data ? this.data.profilePic : '';
	}

	getName(): string {
		return this.data ? this.data.name : '';
	}
}
