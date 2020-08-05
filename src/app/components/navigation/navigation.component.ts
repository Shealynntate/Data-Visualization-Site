import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { MessageService } from '../../services/message.service';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

	constructor(private matIconRegistry: MatIconRegistry, 
		private domSanitizer: DomSanitizer,
		private message: MessageService) {
		const url = `../../../assets/analytics-chart-symbol.svg`;
		// Register the home button icon
		this.matIconRegistry.addSvgIcon(
			`data_icon`,
			this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    	);
	}

	public onSelectHome(): void {
		this.message.announceSelectHome();
	}

	public onSelectAbout(): void {
		this.message.announceSelectAbout();
	}
}
