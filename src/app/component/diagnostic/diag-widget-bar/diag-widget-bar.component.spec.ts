import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagWidgetBarComponent } from './diag-widget-bar.component';

describe('DiagWidgetBarComponent', () => {
  let component: DiagWidgetBarComponent;
  let fixture: ComponentFixture<DiagWidgetBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagWidgetBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagWidgetBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
