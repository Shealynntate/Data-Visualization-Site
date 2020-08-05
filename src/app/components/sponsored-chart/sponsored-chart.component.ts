import { Component } from '@angular/core';
import { Chart } from 'chart.js';

import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'sponsored-chart',
  templateUrl: './sponsored-chart.component.html',
  styleUrls: ['./sponsored-chart.component.scss']
})
export class SponsoredChartComponent extends BaseChartComponent {
	
	protected setChartType(): void {
		this.chartType = 'pie';
	}

	protected createChartData(): any[] {
		this.labels = ['sponsored', 'not sponsored'];
		let talliedData = [0, 0];

		this.profileData.getPosts().forEach(entry => {
			talliedData[entry.sponsored ? 0 : 1]++;
		});

		return [{
			data: talliedData,
			borderColor: [this.tertiaryStroke, this.secondaryStroke],
			backgroundColor: [this.tertiaryFill, this.secondaryFill],
		}];
	}

	protected createChartOptions(): void {
		this.options.legend = { 
			position: 'right',
			labels: {
				padding: 20,
				fontSize: 14
			}
		};
		this.options.layout = {padding: 0};
		this.options.tooltips.callbacks.label = 
			function(tooltipItem, data) {
				const amounts = data.datasets[0].data;
				let total = 0;
				amounts.forEach(amount => total += amount);
				const percent = Math.round(100 * amounts[tooltipItem.index] / total);
				
				return (data.labels[tooltipItem.index] || '') + ' | ' + percent + '%';
			};

	}
}
