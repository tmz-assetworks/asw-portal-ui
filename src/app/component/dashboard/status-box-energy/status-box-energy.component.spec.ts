import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBoxEnergyComponent } from './status-box-energy.component';

describe('StatusBoxEnergyComponent', () => {
  let component: StatusBoxEnergyComponent;
  let fixture: ComponentFixture<StatusBoxEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusBoxEnergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBoxEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
