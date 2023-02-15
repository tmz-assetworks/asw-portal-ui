import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'
import { DatePipe } from '@angular/common'
import { AddChargerComponent } from './add-charger.component'
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

describe('AddChargerComponent', () => {
  let component: AddChargerComponent
  let fixture: ComponentFixture<AddChargerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,

        MatDatepickerModule,
        MatNativeDateModule,
      ],
      declarations: [AddChargerComponent],
      providers: [MatDatepickerModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChargerComponent)
    component = fixture.componentInstance
    // const select = fixture.debugElement.query(By.css('mat-select'))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call GetSwitchGearDropDown method on init', () => {
    const componentSpy = spyOn(
      component,
      'GetSwitchGearDropDown',
    ).and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should call GetCableDropDown method on init', () => {
    const componentSpy = spyOn(component, 'GetCableDropDown').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetConnectorType method on init', () => {
    const componentSpy = spyOn(component, 'GetConnectorType').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetModemDDL method on init', () => {
    const componentSpy = spyOn(component, 'GetModemDDL').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetAllLocation method on init', () => {
    const componentSpy = spyOn(component, 'GetAllLocation').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetAllPadData method on init', () => {
    const componentSpy = spyOn(component, 'GetAllPadData').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetAllRFIdReaderData method on init', () => {
    const componentSpy = spyOn(
      component,
      'GetAllRFIdReaderData',
    ).and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetPowerCabinetData method on init', () => {
    const componentSpy = spyOn(
      component,
      'GetPowerCabinetData',
    ).and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetPlugType method on init', () => {
    const componentSpy = spyOn(component, 'GetPlugType').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })
  it('should call GetDispenserDetailsById method on init', () => {
    const componentSpy = spyOn(
      component,
      'GetDispenserDetailsById'
    ).and.callThrough();

    expect(componentSpy).not.toHaveBeenCalled();

    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalledTimes(0);
  });
  it('should not valid', () => {
    // console.log(component.addCustomerProfile.controls)
    expect(component.addChargerFormGroup.valid).not.toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    component.addChargerFormGroup.setValue({
      assetId: 'ASSET-5005',
      chargeBoxId: 'CB00',
      locationId: 48,
      endPointUrl: '',
      firmwareVersion: '',
      makeMasterId: 'asas',
      modelId: 'asas',
      modemId:  11,
      switchGearId: '',
      rfidReaderId: '',
      powerCabinetId: '',
      protocolName: "1.6J",
      hardwareSerialNumber: "21121",
      meterType: '',
      pingSchedule: '',
      privateStation: '',
      readingSchedule: '',
      padId:12,
      cableId:12,
      installationDate: "2023-01-31T16:48:47",
      isActive: '',
      portCommand: [
        {
          id: 0,
          connectorId: 1,
          connectorType: 3,
          createdBy: "2e8687a7-ab66-4637-83be-9ccc3b66e876",
          incrementalPower:1234,
          isActive: '',
          maxPower: 121212,
          minPower: 12121,
          plugTypeId: 2,
          portName: '21212',
          power: 121212,
        },
      ],
    })

    expect(component.addChargerFormGroup.valid).toEqual(true)
  })

  it('should update the location id  on selecting a value from location drop down', () => {
    component.selectLocation(null, 1)
    component.selectedLocation = 1
    expect(component.selectedLocation).toBe(1)
  })
  it('should update the select connector  on selecting a value from connector drop down', () => {
    component.selectconnector(null, 1)
    component.selectedconnectorType = 1
    expect(component.selectedconnectorType).toBe(1)
  })
  it('should update the select connector  on selecting a value from connector drop down', () => {
    component.selectModem(null, 1)
    component.selectedconnectorType = 1
    expect(component.selectedconnectorType).toBe(1)
  })
})
