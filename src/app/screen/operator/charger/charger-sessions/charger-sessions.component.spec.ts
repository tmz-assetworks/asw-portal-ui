import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerSessionsComponent } from './charger-sessions.component';

describe('ChargerSessionsComponent', () => {
  let component: ChargerSessionsComponent;
  let fixture: ComponentFixture<ChargerSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
