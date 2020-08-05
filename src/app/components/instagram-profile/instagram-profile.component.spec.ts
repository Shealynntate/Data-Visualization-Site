import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramProfileComponent } from './instagram-profile.component';

describe('InstagramProfileComponent', () => {
  let component: InstagramProfileComponent;
  let fixture: ComponentFixture<InstagramProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
