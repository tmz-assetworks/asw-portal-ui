import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOperatorUsersComponent } from './manage-operator-users.component';

describe('ManageOperatorUsersComponent', () => {
  let component: ManageOperatorUsersComponent;
  let fixture: ComponentFixture<ManageOperatorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOperatorUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOperatorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
