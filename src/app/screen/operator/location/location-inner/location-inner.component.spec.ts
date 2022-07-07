import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInnerComponent } from './location-inner.component';

describe('LocationInnerComponent', () => {
  let component: LocationInnerComponent;
  let fixture: ComponentFixture<LocationInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
