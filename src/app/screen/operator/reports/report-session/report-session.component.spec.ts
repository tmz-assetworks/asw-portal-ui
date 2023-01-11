import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSessionComponent } from './report-session.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReportSessionComponent', () => {
  let component: ReportSessionComponent;
  let fixture: ComponentFixture<ReportSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ ReportSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
