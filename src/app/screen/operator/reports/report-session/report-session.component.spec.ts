import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSessionComponent } from './report-session.component';

describe('ReportSessionComponent', () => {
  let component: ReportSessionComponent;
  let fixture: ComponentFixture<ReportSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
