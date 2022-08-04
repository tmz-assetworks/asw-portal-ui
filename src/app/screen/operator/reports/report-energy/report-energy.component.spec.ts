import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnergyComponent } from './report-energy.component';

describe('ReportEnergyComponent', () => {
  let component: ReportEnergyComponent;
  let fixture: ComponentFixture<ReportEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEnergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
