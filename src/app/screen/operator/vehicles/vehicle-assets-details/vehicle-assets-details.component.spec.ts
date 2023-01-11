import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssetsDetailsComponent } from './vehicle-assets-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VehicleAssetsDetailsComponent', () => {
  let component: VehicleAssetsDetailsComponent;
  let fixture: ComponentFixture<VehicleAssetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
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
