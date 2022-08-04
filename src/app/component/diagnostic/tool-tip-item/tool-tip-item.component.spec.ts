import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipItemComponent } from './tool-tip-item.component';

describe('ToolTipItemComponent', () => {
  let component: ToolTipItemComponent;
  let fixture: ComponentFixture<ToolTipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolTipItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
