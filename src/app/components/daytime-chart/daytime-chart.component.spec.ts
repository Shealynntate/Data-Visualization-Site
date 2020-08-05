import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaytimeChartComponent } from './daytime-chart.component';

describe('DaytimeChartComponent', () => {
  let component: DaytimeChartComponent;
  let fixture: ComponentFixture<DaytimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaytimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaytimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
