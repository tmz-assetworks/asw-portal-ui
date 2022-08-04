import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssetsDetailsComponent } from './vehicle-assets-details.component';

describe('VehicleAssetsDetailsComponent', () => {
  let component: VehicleAssetsDetailsComponent;
  let fixture: ComponentFixture<VehicleAssetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAssetsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
