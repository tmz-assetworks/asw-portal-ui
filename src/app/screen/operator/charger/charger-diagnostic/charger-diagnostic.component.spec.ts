import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerDiagnosticComponent } from './charger-diagnostic.component';

describe('ChargerDiagnosticComponent', () => {
  let component: ChargerDiagnosticComponent;
  let fixture: ComponentFixture<ChargerDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerDiagnosticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
