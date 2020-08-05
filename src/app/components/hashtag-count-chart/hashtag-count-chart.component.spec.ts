import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagCountChartComponent } from './hashtag-count-chart.component';

describe('HashtagCountChartComponent', () => {
  let component: HashtagCountChartComponent;
  let fixture: ComponentFixture<HashtagCountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagCountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
