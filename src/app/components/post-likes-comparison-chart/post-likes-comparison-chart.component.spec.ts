import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesComparisonChartComponent } from './post-likes-comparison-chart.component';

describe('PostLikesComparisonChartComponent', () => {
  let component: PostLikesComparisonChartComponent;
  let fixture: ComponentFixture<PostLikesComparisonChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLikesComparisonChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLikesComparisonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
