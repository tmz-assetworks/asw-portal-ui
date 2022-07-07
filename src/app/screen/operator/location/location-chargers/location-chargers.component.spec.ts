import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChargersComponent } from './location-chargers.component';

describe('LocationChargersComponent', () => {
  let component: LocationChargersComponent;
  let fixture: ComponentFixture<LocationChargersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationChargersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationChargersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
