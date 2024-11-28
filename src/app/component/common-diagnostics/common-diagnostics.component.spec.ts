import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDiagnosticsComponent } from './common-diagnostics.component';

describe('CommonDiagnosticsComponent', () => {
  let component: CommonDiagnosticsComponent;
  let fixture: ComponentFixture<CommonDiagnosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDiagnosticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
