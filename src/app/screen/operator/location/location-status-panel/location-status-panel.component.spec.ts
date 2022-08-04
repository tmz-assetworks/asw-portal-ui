import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStatusPanelComponent } from './location-status-panel.component';

describe('LocationStatusPanelComponent', () => {
  let component: LocationStatusPanelComponent;
  let fixture: ComponentFixture<LocationStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStatusPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
