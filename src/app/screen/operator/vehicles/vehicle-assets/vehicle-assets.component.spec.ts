import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssetsComponent } from './vehicle-assets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VehicleAssetsComponent', () => {
  let component: VehicleAssetsComponent;
  let fixture: ComponentFixture<VehicleAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,MatPaginatorModule,BrowserAnimationsModule],
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
