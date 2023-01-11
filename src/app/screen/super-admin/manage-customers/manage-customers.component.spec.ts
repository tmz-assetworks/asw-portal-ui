import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomersComponent } from './manage-customers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManageCustomersComponent', () => {
  let component: ManageCustomersComponent;
  let fixture: ComponentFixture<ManageCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ ManageCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
