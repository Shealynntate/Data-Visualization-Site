import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesChartComponent } from './post-likes-chart.component';

describe('PostLikesChartComponent', () => {
  let component: PostLikesChartComponent;
  let fixture: ComponentFixture<PostLikesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLikesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLikesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
