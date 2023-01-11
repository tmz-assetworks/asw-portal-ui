import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehiclesComponent } from './manage-vehicles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManageVehiclesComponent', () => {
  let component: ManageVehiclesComponent;
  let fixture: ComponentFixture<ManageVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot(),MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ ManageVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
