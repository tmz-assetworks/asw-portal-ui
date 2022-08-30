import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargerComponent } from './add-charger.component';

describe('AddChargerComponent', () => {
  let component: AddChargerComponent;
  let fixture: ComponentFixture<AddChargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChargerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
