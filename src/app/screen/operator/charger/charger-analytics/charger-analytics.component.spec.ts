import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerAnalyticsComponent } from './charger-analytics.component';

describe('ChargerAnalyticsComponent', () => {
  let component: ChargerAnalyticsComponent;
  let fixture: ComponentFixture<ChargerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
