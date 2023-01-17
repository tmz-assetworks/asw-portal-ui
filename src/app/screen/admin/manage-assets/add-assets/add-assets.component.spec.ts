import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'

import { AddAssetsComponent } from './add-assets.component'

describe('AddAssetsComponent', () => {
  let component: AddAssetsComponent
  let fixture: ComponentFixture<AddAssetsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddAssetsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should call GetAllLocation() method on init', () => {
    const componentSpy = spyOn(component, 'GetAllLocation').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()

    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetAllMakeMaster() method on init', () => {
    const componentSpy = spyOn(component, 'GetAllMakeMaster').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()

    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should call GetAllModelData() method on init', () => {
    const componentSpy = spyOn(component, 'GetAllModelData').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()

    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('form invalid when empty', () => {
    expect(component.addAssetsForm.valid).toBeFalsy()
  })

  it('should have #showCableForm to be false', async () => {
    expect(component.showCableForm).toEqual(false)
  })
  it('should have #showModemForm to be false', async () => {
    expect(component.showModemForm).toEqual(false)
  })
  it('should have #showPadsForm to be false', async () => {
    expect(component.showPadsForm).toEqual(false)
  })
  it('should have #showPowerCabinetForm to be false', async () => {
    expect(component.showPowerCabinetForm).toEqual(false)
  })
  it('should have #showRFIDForm to be false', async () => {
    expect(component.showRFIDForm).toEqual(false)
  })
  it('should have #showSwitchGearForm to be false', async () => {
    expect(component.showSwitchGearForm).toEqual(false)
  })

  it(`should have as title 'Add Assets'`, () => {
    expect(component.title).toEqual('Add Assets')
  })

  it('should be valid if #CABLE form value is valid', () => {
    component.addAssetsForm['controls']['assetCableDetails'].setValue({
      Make: 2,
      Model: 1,
      WarrantyEnd: '2023-01-26T14:11:15',
      WarrantyStart: '2023-01-10T14:11:15',
      WarrantyDuration: 16,
    })

    expect(
      component.addAssetsForm['controls']['assetCableDetails'].valid,
    ).toEqual(true)
  })

  it('should be valid if #MODEM form value is valid', () => {
    component.addAssetsForm['controls']['assetModemDetails'].setValue({
      Carrier: 1,
      ImeiNumber: 1,
      InstallationDate: '2023-01-15T14:11:15',
      IpAddress: '192.168.1.1',
      Make: 2,
      Model: 1,
      SimNumber: 1,
      ModemType: 1,
      WarrantyEnd: '2023-01-26T14:11:15',
      WarrantyStart: '2023-01-10T14:11:15',
      WarrantyDuration: 16,
    })

    expect(
      component.addAssetsForm['controls']['assetModemDetails'].valid,
    ).toEqual(true)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
