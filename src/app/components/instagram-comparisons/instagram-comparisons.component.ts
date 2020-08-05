import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

import { MessageService } from '../../services/message.service';
import { ProfileData } from '../../models/profile-data.model';

@Component({
  selector: 'instagram-comparisons',
  templateUrl: './instagram-comparisons.component.html',
  styleUrls: ['./instagram-comparisons.component.scss']
})
export class InstagramComparisonsComponent implements OnInit {

	@Input() profiles: ProfileData[] = [];
	@ViewChild('profileList') profileList: MatSelectionList;

	public selectedCategoryProfiles: ProfileData[] = [];
	public selectedProfile: ProfileData;
	public selectedCategory: string;

	constructor(private message: MessageService) { }

	public ngOnInit(): void {
		this.message.selectHomeAnnounced$.subscribe(
			() => { 
				this.selectedProfile = null;
				this.profileList.deselectAll();
			}
		);

	}

	public ngOnChanges(changes: SimpleChanges): void {
		// Auto-select the first category when the page is first loaded
		if (this.profiles.length && this.selectedCategoryProfiles.length == 0) {
			const categories = this.getCategoryList();
			this.onSelectCategory(categories[0]);
		}
	}

	public onProfileSelect(change: MatSelectionListChange): void {
		this.selectedProfile = change.option.value;
		this.message.announceIGProfileData(this.selectedProfile);
	}

	public onDateChange(): void {
		this.message.announceRefreshChartData();
	}

	private getProfileFromHandle(handle: string): ProfileData {
		return this.profiles.find(profile => profile.handle === handle);
	}

	public getCategoryList(): string[] {
		let categories = [];
		this.profiles.forEach(profile =>  {
			if (categories.indexOf(profile.category) === -1) {
				categories.push(profile.category);
			}
		});

		return categories;
	}

	public getProfilesInCategory(category: string): ProfileData[] {
		return this.profiles.filter(profile => profile.category === category);
	}

	public onSelectCategory(category: string): void {
		this.selectedCategory = category;
		this.selectedCategoryProfiles = this.profiles.filter(profile => profile.category === category);
		if (this.selectedCategoryProfiles[0].getPosts().length === 0) {
			this.message.announceProfilePostsRequest(this.selectedCategoryProfiles);
		}
	}
}
