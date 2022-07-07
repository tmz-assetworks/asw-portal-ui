import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBoxElementComponent } from './status-box-element.component';

describe('StatusBoxElementComponent', () => {
  let component: StatusBoxElementComponent;
  let fixture: ComponentFixture<StatusBoxElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusBoxElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBoxElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
