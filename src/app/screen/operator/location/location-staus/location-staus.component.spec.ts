import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStausComponent } from './location-staus.component';

describe('LocationStausComponent', () => {
  let component: LocationStausComponent;
  let fixture: ComponentFixture<LocationStausComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStausComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
