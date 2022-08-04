import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerInnerComponent } from './charger-inner.component';

describe('ChargerInnerComponent', () => {
  let component: ChargerInnerComponent;
  let fixture: ComponentFixture<ChargerInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
