import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendsDialogComponent } from './legends-dialog.component';

describe('LegendsDialogComponent', () => {
  let component: LegendsDialogComponent;
  let fixture: ComponentFixture<LegendsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
