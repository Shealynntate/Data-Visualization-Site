import { Component } from '@angular/core';
import { Chart } from 'chart.js';

import { BaseChartComponent } from '../base-chart.component';

@Component({
	selector: 'daytime-chart',
	templateUrl: './daytime-chart.component.html',
	styleUrls: ['./daytime-chart.component.scss']
})
export class DaytimeChartComponent extends BaseChartComponent {

	protected setChartType(): void {
		this.chartType = 'doughnut';
	}

	protected createChartData(): any[] {
		this.labels = ['morning', 'afternoon', 'evening'];
		let talliedData = [0, 0, 0];

		this.profileData.getPosts().forEach(entry => {
			const hour = entry.date.getHours();
			if (hour <= 5) {
				talliedData[2]++;
			} else if (hour <= 12) {
				talliedData[0]++;
			} else if (hour <= 17) {
				talliedData[1]++;
			} else {
				talliedData[2]++;
			}
		});

		return [{
			data: talliedData,
			borderColor: [this.secondaryStroke, this.tertiaryStroke, this.quaternaryStroke],
			backgroundColor: [this.secondaryFill, this.tertiaryFill, this.quaternaryFill],
		}];
	}

	protected createChartOptions(): void {
		this.options.tooltips.callbacks.label = 
			function(tooltipItem, data) {
				const amounts = data.datasets[0].data;
				let total = 0;
				amounts.forEach(amount => total += amount);
				const percent = Math.round(100 * amounts[tooltipItem.index] / total);
				
				return (data.labels[tooltipItem.index] || '') + ' | ' + percent + '%';
			};

		this.options.legend = { 
			position: 'right',
			labels: {
				padding: 20,
				fontSize: 14
			},
			layout: { padding: 0 }
		};
	}
}
