import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerDiagnosticComponent } from './charger-diagnostic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import {  ReactiveFormsModule } from '@angular/forms';

describe('ChargerDiagnosticComponent', () => {
  let component: ChargerDiagnosticComponent;
  let fixture: ComponentFixture<ChargerDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),MatDialogModule,ReactiveFormsModule],
      declarations: [ ChargerDiagnosticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
