import { Component } from '@angular/core';
import { Chart } from 'chart.js';

import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'hashtag-count-chart',
  templateUrl: './hashtag-count-chart.component.html',
  styleUrls: ['./hashtag-count-chart.component.scss']
})
export class HashtagCountChartComponent extends BaseChartComponent {

	protected setChartType(): void {
		this.chartType = 'bar';
	}
	
	protected createChartData(): any[] {
		let numHashtags = 5;
		let hashtagCounts = {};
		let counts = [];

		this.profileData.getPosts().forEach(entry =>{
			entry.hashtags.forEach(tag => {
				if (hashtagCounts[tag]) {
					hashtagCounts[tag]++;
				} else {
					hashtagCounts[tag] = 1;
				}
			});
		});
		
		while (numHashtags > 0 && Object.keys(hashtagCounts).length >= numHashtags) {
			let maxKey = null;
			let maxValue = -1;
			for (let key in hashtagCounts) {
				if (hashtagCounts[key] > maxValue) {
					maxKey = key;
					maxValue = hashtagCounts[key];
				}
			}
			if (maxValue < 0) {
				console.log('Error occurred');
				break;
			}
			this.labels.push(maxKey);
			counts.push(maxValue);
			delete hashtagCounts[maxKey];
			numHashtags--;
		}

		return [{
        	data: counts,
            label: '@' + this.profileData.handle,
            borderWidth: 1,
            borderColor: this.primaryStroke,
            backgroundColor: this.primaryFill,
    	}];
	}

	protected createChartOptions(): void {
		this.options.legend = {display: false};
		this.options.scales = {
			xAxes: [{
				display: true,
				gridLines: {
					display: true,
					color: 'rgba(255, 255, 255, 0.1)'
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					display: true,
					color: 'rgba(255, 255, 255, 0.1)'
				},
				ticks: {
					beginAtZero: true,
					callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                }
			}]
		};
	}
}
