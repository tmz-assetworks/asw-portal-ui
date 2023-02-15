import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let dummyPanel:any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dummyPanel={};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be panelOpenState false.', () => {
    expect(component.panelOpenState).toEqual(false);
  });
 it('should return false',()=>{
  dummyPanel.panelOpenState=false;
  dummyPanel.panelOpenState=true;
  expect(dummyPanel.panelOpenState).toBe(true);
 });
});
