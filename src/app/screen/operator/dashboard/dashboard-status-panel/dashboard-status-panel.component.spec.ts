import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatusPanelComponent } from './dashboard-status-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardStatusPanelComponent', () => {
  let component: DashboardStatusPanelComponent;
  let fixture: ComponentFixture<DashboardStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ DashboardStatusPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
