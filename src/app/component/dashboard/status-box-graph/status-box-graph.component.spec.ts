import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBoxGraphComponent } from './status-box-graph.component';

describe('StatusBoxGraphComponent', () => {
  let component: StatusBoxGraphComponent;
  let fixture: ComponentFixture<StatusBoxGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusBoxGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBoxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
