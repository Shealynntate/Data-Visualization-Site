import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredChartComponent } from './sponsored-chart.component';

describe('SponsoredChartComponent', () => {
  let component: SponsoredChartComponent;
  let fixture: ComponentFixture<SponsoredChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsoredChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsoredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
