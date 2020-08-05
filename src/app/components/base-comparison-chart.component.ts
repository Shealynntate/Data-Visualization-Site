import { Component, Input, SimpleChanges } from '@angular/core';
import { BaseChartComponent } from './base-chart.component';

import { ProfileData } from '../models/profile-data.model';

export abstract class BaseComparisonChartComponent extends BaseChartComponent {

	@Input() profilesData: ProfileData[];

	private updateRequested: boolean;

	// ------------------------------------------------------------
	ngOnInit(): void {
		this.setChartType();
		this.initOptions();
		this.addSub(this.message.refreshChartDataAnnounced$,
			() => { 
				if (this.profilesData.length) {
					this.updateChartData();
					this.chart.update();
				}
			}
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.profilesData.isFirstChange() && this.profilesData.length) {
			this.updateRequested = true;
			return;
		}

		if (this.profilesData.length) {
			if (!this.chart) {
				this.createChart();
			} else {
				this.updateChartData();
				this.chart.update();
			}
		} else if (this.chart) {
			this.chart.destroy();
		}
	}

	ngAfterViewInit(): void {
		if (this.updateRequested) {
			this.createChart();
			this.updateRequested = false;
		}
	}
}