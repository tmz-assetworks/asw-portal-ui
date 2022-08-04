import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagTableComponent } from './diag-table.component';

describe('DiagTableComponent', () => {
  let component: DiagTableComponent;
  let fixture: ComponentFixture<DiagTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
