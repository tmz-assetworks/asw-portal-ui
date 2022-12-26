import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterChartComponent } from './meter-chart.component';

describe('MeterChartComponent', () => {
  let component: MeterChartComponent;
  let fixture: ComponentFixture<MeterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
