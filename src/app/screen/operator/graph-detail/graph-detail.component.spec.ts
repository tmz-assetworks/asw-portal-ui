import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDetailComponent } from './graph-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GraphDetailComponent', () => {
  let component: GraphDetailComponent;
  let fixture: ComponentFixture<GraphDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,ReactiveFormsModule,ToastrModule.forRoot(),MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ GraphDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
