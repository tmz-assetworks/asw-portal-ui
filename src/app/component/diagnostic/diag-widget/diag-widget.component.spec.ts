import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagWidgetComponent } from './diag-widget.component';

describe('DiagWidgetComponent', () => {
  let component: DiagWidgetComponent;
  let fixture: ComponentFixture<DiagWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
