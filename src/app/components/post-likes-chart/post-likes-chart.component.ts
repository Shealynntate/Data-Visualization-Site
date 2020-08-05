import { Component } from '@angular/core';
import { Chart } from 'chart.js';

import { BaseChartComponent } from '../base-chart.component';

@Component({
	selector: 'post-likes-chart',
	templateUrl: './post-likes-chart.component.html',
	styleUrls: ['./post-likes-chart.component.scss']
})
export class PostLikesChartComponent extends BaseChartComponent {

	ngAfterViewInit(): void {
		this.getCanvas().onclick = function(event) {
  			const activePoint = this.chart.getElementAtEvent(event);
  			if (activePoint.length) {
	    		const clickedElementindex = activePoint[0]._index;
	    		const shortcode = this.profileData.getPosts()[clickedElementindex].shortcode;
	    		const url = 'https://instagram.com/p/'+shortcode+'/';
				window.open(url, "_blank");
  			}
  		}.bind(this);
	}

	protected setChartType(): void {
		this.chartType = 'line';
	}

	protected createChartData(): any[] {
		let averageComments = 0;
		let averageLikes = 0;
		const posts = this.profileData.getPosts();

		const likesData = posts.map(
			entry => {
				this.labels.push(this.formatDateLabel(entry.date));
				averageLikes += entry.likes;
				return entry.likes;
			}
		);

		const commentsData = posts.map(entry => {
			averageComments += entry.comments;
			return entry.comments;
		});

		let averageLikesData = new Array(likesData.length);
		averageLikesData.fill(averageLikes/likesData.length);
		let averageCommentsData = new Array(commentsData.length);
		averageCommentsData.fill(averageComments/commentsData.length);


		let result = [{
        	data: likesData,
            label: 'likes',
            yAxisID: 'likes',
            borderWidth: 1,
            borderColor: this.primaryStroke,
            backgroundColor: this.primaryFill,
            pointBackgroundColor: this.primaryStroke,
            pointRadius: 2,
		},
		{
        	data: averageLikesData,
        	label: 'average',
        	yAxisID: 'likes',
            borderWidth: 1,
            borderColor: this.primaryStroke,
            borderDash: [3, 5],
            pointRadius: 0,
    	},
		{
        	data: commentsData,
            label: 'comments',
            yAxisID: 'comments',
            borderWidth: 1,
            borderColor: this.secondaryStroke,
            backgroundColor: this.secondaryFill,
            pointBackgroundColor: this.secondaryStroke,
            pointRadius: 2,
    	},
    	{
        	data: averageCommentsData,
        	label: 'average',
        	yAxisID: 'comments',
            borderWidth: 1,
            borderColor: this.secondaryStroke,
            borderDash: [3, 5],
            pointRadius: 0,
    	}];

	    return result;
	}

	protected createChartOptions(): void {
		this.options.legend = { 
        	onClick: this.newLegendClickHandler,
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
			yAxes: [
			{
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
                	labelString: 'Likes'
                },
			},
			{
				display: true,
				id: 'comments',
				position: 'right',
				ticks: {
					callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                },
				scaleLabel: {
                	display: true,
                	labelString: 'Comments'
                },
			}]
		};
	}

	private newLegendClickHandler(e, legendItem) {
		let ci = this.chart;
	    var index = legendItem.datasetIndex;

	    if (index % 2) {
	        // Do the original logic
	        let meta = this.chart.getDatasetMeta(index);
	        meta.hidden = meta.hidden === null ? !this.chart.data.datasets[index].hidden : null;
	    } else {
	        [ci.getDatasetMeta(index),ci.getDatasetMeta(index+1)].forEach(function(meta) {
	            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
	        });
	    }
		ci.update();
	}
}
