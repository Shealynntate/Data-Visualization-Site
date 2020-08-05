import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../../services/message.service';
import { ProfileData } from '../../models/profile-data.model';

@Component({
	selector: 'date-slider',
	templateUrl: './date-slider.component.html',
	styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit, OnDestroy {

	@Input() profile: ProfileData;
	@Output() change = new EventEmitter<void>();

	constructor(private message: MessageService) { }

	public get start(): Date { return this.profile ? this.profile.startDate : new Date(); }
	public set start(value: Date) { 
		if (this.profile) {
			this.profile.startDate = value;
		}
	}
	public get end(): Date { return this.profile ? this.profile.endDate : new Date(); }
	public set end(value: Date) {
		if (this.profile) {
			this.profile.endDate = value;
		}
	}
	public options: any = {
		floor: new Date(), 
		ceil: new Date(),
		translate: (value: number, label): string => {
			let date = (new Date(value)).toDateString().split(' ');
			date.shift();
			return date.join(' ');
		}
	};

	private subscription: Subscription = new Subscription();

	ngOnInit(): void {
		this.subscription.add(this.message.profilePostsResponseAnnounced$.subscribe(
			() => {
				this.createOptions();
			}
		));
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.createOptions();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onChange(event): void {
		this.change.next();
	}

	private createOptions(): void {
		if (!this.profile) {
			return;
		}

		this.options = {
			floor: this.profile.getEarliestDate(),
			ceil: this.profile.getLatestDate(),
			translate: (value: number, label): string => {
				let date = (new Date(value)).toDateString().split(' ');
				date.shift();
				return date.join(' ');
			}
		};

		if (this.profile.startDate == this.profile.endDate) {
			this.profile.startDate = new Date('01 01 2020');
		}		
		this.start = this.profile.startDate;
		this.end = this.profile.endDate;
		this.onChange({});
	}
}
