import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExceptionsComponent } from './report-exceptions.component';

describe('ReportExceptionsComponent', () => {
  let component: ReportExceptionsComponent;
  let fixture: ComponentFixture<ReportExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportExceptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
