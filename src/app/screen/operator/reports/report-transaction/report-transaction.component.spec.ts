import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransactionComponent } from './report-transaction.component';

describe('ReportTransactionComponent', () => {
  let component: ReportTransactionComponent;
  let fixture: ComponentFixture<ReportTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
