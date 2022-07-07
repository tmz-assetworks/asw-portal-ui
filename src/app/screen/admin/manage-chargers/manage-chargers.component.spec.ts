import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChargersComponent } from './manage-chargers.component';

describe('ManageChargersComponent', () => {
  let component: ManageChargersComponent;
  let fixture: ComponentFixture<ManageChargersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageChargersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChargersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
