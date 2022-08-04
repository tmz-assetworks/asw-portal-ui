import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerEventComponent } from './charger-event.component';

describe('ChargerEventComponent', () => {
  let component: ChargerEventComponent;
  let fixture: ComponentFixture<ChargerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
