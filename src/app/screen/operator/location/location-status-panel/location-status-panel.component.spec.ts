import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStatusPanelComponent } from './location-status-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationStatusPanelComponent', () => {
  let component: LocationStatusPanelComponent;
  let fixture: ComponentFixture<LocationStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
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
