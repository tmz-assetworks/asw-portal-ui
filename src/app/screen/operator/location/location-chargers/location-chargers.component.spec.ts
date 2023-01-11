import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChargersComponent } from './location-chargers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationChargersComponent', () => {
  let component: LocationChargersComponent;
  let fixture: ComponentFixture<LocationChargersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,ToastrModule.forRoot(),MatPaginatorModule,BrowserAnimationsModule],
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
