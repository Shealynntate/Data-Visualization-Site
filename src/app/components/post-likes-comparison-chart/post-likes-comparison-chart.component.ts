import { Component, OnInit } from '@angular/core';

import { ProfileData } from '../../models/profile-data.model';
import { BaseComparisonChartComponent } from '../base-comparison-chart.component';

@Component({
	selector: 'post-likes-comparison-chart',
	templateUrl: './post-likes-comparison-chart.component.html',
	styleUrls: ['./post-likes-comparison-chart.component.scss']
})
export class PostLikesComparisonChartComponent extends BaseComparisonChartComponent {

	ngAfterViewInit(): void {
		this.getCanvas().onclick = function(event) {
  			const activePoint = this.chart.getElementAtEvent(event);
  			if (activePoint.length) {
	    		const clickedElementindex = activePoint[0]._index;
	    		const profileIndex = activePoint[0]._datasetIndex;
	    		const shortcode = this.profilesData[profileIndex].getPosts()[clickedElementindex].shortcode;
	    		const url = 'https://instagram.com/p/'+shortcode+'/';
				window.open(url, "_blank");
  			}
  		}.bind(this);
	}

	protected setChartType(): void {
		this.chartType = 'line';
	}

	protected createChartData(): any[] {
		let meanLikes = {};
		let colors = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary', 'accent'];

		this.profilesData.forEach(profile => {
			const mean = this.computeMeanLikes(profile);
			meanLikes[profile.handle] = {mean: mean, posts: profile.getPosts()};
		});
		const allDates = this.setupLabels();
		let result = [];
		let index = 0;
		for (let handle in meanLikes) {
			let chartData = [];
			const mean = meanLikes[handle].mean;
			const posts = meanLikes[handle].posts;
			let postIndex = 0;
			allDates.forEach(label => {
				const date = postIndex < posts.length ? posts[postIndex].date : null;
				if (label == date) {
					chartData.push({x: this.formatDateLabel(label), y: posts[postIndex].likes/mean});
					postIndex++;
				} else {
					if (date < label) {
						postIndex++;
					}
				}
			});
			// Add the data to the chart
			const color = colors[index % colors.length];
			result.push({
	    		data: chartData,
	        	label: '@'+handle,
	    		spanGaps: true,
	        	yAxisID: 'likes',
	        	borderWidth: 1,
	        	borderColor: this[color+'Stroke'],
	        	backgroundColor: this[color+'Fill'],
	        	pointBackgroundColor: this[color+'Stroke'],
	        	pointRadius: 2,
			});
			index++;
		}

	    return result;
	}

	protected createChartOptions(): void {
		this.options.legend = { 
			labels: { padding: 20 }
		};
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
				id: 'likes',
				position: 'left',
				gridLines: {
					display: true,
					color: 'rgba(255, 255, 255, 0.1)'
				},
				ticks: {
					callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                },
                scaleLabel: {
                	display: true,
                	labelString: 'Likes / Average'
                },
			}]
		};
	}

	protected computeMeanLikes(profile: ProfileData): number {
		let totalLikes = 0;
		profile.getPosts().forEach(post => totalLikes += post.likes);

		return totalLikes / profile.getPosts().length;
	}

	protected setupLabels(): Date[] {
		let dates: Date[] = [];
		this.profilesData.forEach(profile => {
			profile.getPosts().forEach(post => {
				if (dates.indexOf(post.date) > -1) {
					return;
				}

				let index = 0;
				while (index < dates.length) {
					let d1 = dates[index];
					if (d1 > post.date) {
						dates.splice(index, 0, post.date);
						return;
					}
					index++;
				}
				dates.push(post.date);
			});
		});

		this.labels = dates.map(date => this.formatDateLabel(date));
		return dates;
	}

	protected addDateToLabels(date: string): void {
		if (this.labels.indexOf(date) > -1) {
			return;
		}

		let index = 0;
		let d2 = new Date(date);
		while (index < this.labels.length) {
			let d1 = new Date(this.labels[index]);
			if (d1 > d2) {
				this.labels.splice(index, 0, date);
				return;
			}
			index++;
		}
		// Must be later than all date labels, add to end
		this.labels.push(date);
	}
}
