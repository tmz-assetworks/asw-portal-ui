import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsComponent } from './diagnostics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('DiagnosticsComponent', () => {
  let component: DiagnosticsComponent;
  let fixture: ComponentFixture<DiagnosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),MatDialogModule,ReactiveFormsModule,MatAutocompleteModule],
      declarations: [ DiagnosticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
