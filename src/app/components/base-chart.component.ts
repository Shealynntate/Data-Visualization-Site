import { Component, OnInit, OnDestroy, Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Chart } from 'chart.js';

import { ProfileData } from '../models/profile-data.model';
import { MessageService } from '../services/message.service';

export abstract class BaseChartComponent implements OnInit, OnDestroy {

	@Input() profileData: ProfileData;
	@ViewChild('chartCanvas') chartCanvas: ElementRef;

	public fontColor: string = 'rgba(255, 255, 255, 0.54)';
	public primaryStroke: string = 'rgb(92, 88, 182)';
	public primaryFill: string = 'rgba(92, 88, 182, 0.1)';
	public secondaryStroke: string = 'rgb(185, 87, 206)';
	public secondaryFill: string = 'rgba(185, 87, 206, 0.1)';
	public tertiaryStroke: string = 'rgb(5, 255, 161)';
	public tertiaryFill: string = 'rgba(5, 255, 161, 0.1)';
	public quaternaryStroke: string = 'rgb(58, 78, 147)';
	public quaternaryFill: string = 'rgba(58, 78, 147, 0.1)';
	public quinaryStroke: string = 'rgb(88, 148, 209)';
	public quinaryFill: string = 'rgba(88, 148, 209, 0.1)';	
	public accentStroke: string = 'rgb(255, 253, 102)';
	public accentFill: string = 'rgba(255, 253, 102, 0.1)';

	public chart: Chart;

	protected subscription = new Subscription();
	protected labels: string[];
	protected options: any = {};
	protected chartType: string;

	// ------------------------------------------------------------
	public constructor(protected message: MessageService) { }

	ngOnInit(): void {
		this.setChartType();
		this.initOptions();

		this.addSub(this.message.refreshChartDataAnnounced$,
			() => { 
				if (this.profileData) {
					this.updateChartData();
					this.chart.update();
				}
			}
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.profileData) {
			this.createChart();
		} else if (this.chart) {
			this.chart.destroy();
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	protected abstract setChartType(): void;

	protected abstract createChartData(): any[];

	protected abstract createChartOptions(): void;

	protected createChart(): void {
		this.labels = [];
		this.createChartOptions();
		this.chart = new Chart(this.getCTX(), {
			type: this.chartType,
			data: {
				datasets: this.createChartData(),
				labels: this.labels,
			},
			options: this.options
		});
	}

	protected updateChartData(): void {
		this.labels = [];
		const data = this.createChartData();
		this.chart.data.datasets = data;
		this.chart.data.labels = this.labels;
	}

	// Helper Functions
	// ------------------------------------------------------------
	protected getCanvas() {
		return this.chartCanvas.nativeElement;
	}

	protected getCTX() {
		return this.getCanvas().getContext('2d');
	}

	protected addSub(observable: Observable<any>, callback: (any?) => void): void {
		this.subscription.add(observable.subscribe(
			response => { callback(response); }
		));
	}

	protected formatDateLabel(date: Date): string {
		let parts = [date.getMonth()+1, date.getDate(), date.getFullYear().toString().substring(2)];

		return parts.join('-');
	}

	protected initOptions(): void {
		this.options = {
			title: {display: false},
			tooltips: {
	            callbacks: {
	                label: function(tooltipItem, data) {
	                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

	                    if (label) {
	                        label += ' | ';
	                    }
	                    label += Math.round(tooltipItem.yLabel).toLocaleString();
	                    return label;
	                }
	            }
	        }
		};
	}
}