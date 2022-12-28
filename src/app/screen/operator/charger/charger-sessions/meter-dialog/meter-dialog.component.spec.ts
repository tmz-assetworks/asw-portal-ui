import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDialogComponent } from './meter-dialog.component';

describe('MeterDialogComponent', () => {
  let component: MeterDialogComponent;
  let fixture: ComponentFixture<MeterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
