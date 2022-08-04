import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssetsComponent } from './vehicle-assets.component';

describe('VehicleAssetsComponent', () => {
  let component: VehicleAssetsComponent;
  let fixture: ComponentFixture<VehicleAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
