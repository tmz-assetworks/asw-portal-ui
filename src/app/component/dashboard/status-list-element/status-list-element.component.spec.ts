import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListElementComponent } from './status-list-element.component';

describe('StatusListElementComponent', () => {
  let component: StatusListElementComponent;
  let fixture: ComponentFixture<StatusListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
