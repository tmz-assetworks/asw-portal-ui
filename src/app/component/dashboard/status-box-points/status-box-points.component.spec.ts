import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBoxPointsComponent } from './status-box-points.component';

describe('StatusBoxPointsComponent', () => {
  let component: StatusBoxPointsComponent;
  let fixture: ComponentFixture<StatusBoxPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusBoxPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBoxPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
