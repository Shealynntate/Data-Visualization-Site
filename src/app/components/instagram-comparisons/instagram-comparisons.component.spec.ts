import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramComparisonsComponent } from './instagram-comparisons.component';

describe('InstagramComparisonsComponent', () => {
  let component: InstagramComparisonsComponent;
  let fixture: ComponentFixture<InstagramComparisonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramComparisonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramComparisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
