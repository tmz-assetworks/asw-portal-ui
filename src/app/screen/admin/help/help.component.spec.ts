import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HelpComponent } from './help.component'

describe('HelpComponent', () => {
  let component: HelpComponent
  let fixture: ComponentFixture<HelpComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    component.ngOnInit()
    expect(component).toBeTruthy()
  })
  it('should be panelOpenState false.', () => {
    expect(component.panelOpenState).toEqual(false);
  });
  it('should be panelOpenState1 false.', () => {
    expect(component.panelOpenState1).toEqual(false);
  });
  it('should be panelOpenState2 false.', () => {
    expect(component.panelOpenState2).toEqual(false);
  });
  it('should be panelOpenState3 false.', () => {
    expect(component.panelOpenState3).toEqual(false);
  });


})
