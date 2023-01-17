import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ManageChargersComponent } from './manage-chargers.component';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../admin.service';

describe('ManageChargersComponent', () => {
  let component: ManageChargersComponent;
  let fixture: ComponentFixture<ManageChargersComponent>;
  let adminService: AdminService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [ManageChargersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChargersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GetDispensersWithPagination method on init', () => {
    const componentSpy = spyOn(
      component,
      'GetDispensersWithPagination'
    ).and.callThrough();

    expect(componentSpy).not.toHaveBeenCalled();

    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should have page size 10', async () => {
    component.ngOnInit();
    expect(component.pageSize).toEqual(10);
  });

  it('should have page size Options', async () => {
    component.ngOnInit();
    expect(component.pageSizeOptions).toEqual([10, 20, 100]);
  });
  it('should have current page number', async () => {
    component.ngOnInit();
    expect(component.currentPage).toEqual(1);
  });

  it('should have All charger  List', async () => {
    component.ngOnInit();
    expect(component.GetDispensersWithPagination()).toEqual();
  });

  it('should have Header data ', async () => {
    let mockDisplayedColumns = [
      'chargeBoxId',
      'locationName',
      'make',
      'model',
      'rfidReader',
      'status',
      'protocol',
      'Action',
    ];
    //component.ngOnInit()
    expect(component.displayedColumns).toEqual(mockDisplayedColumns);
  });

  it('should populate datasource', () => {
    expect(component.dataSource).not.toBeNull();
  });

  // it('should data source', () => {
  //   let mockDataSource = [
  //     {
  //       assetId: 'ASSET-5005',
  //       cableId: 11,
  //       cableSerialNumber: 'LEONIexFC11',
  //       chargeBoxId: 'CB00',
  //       dispenserStatusId: 0,
  //       endPointUrl: '',
  //       firmwareVersion: '',
  //       fleetStation: true,
  //       hardwareSerialNumber: '232312323',
  //       id: 281,
  //       isActive: true,
  //       isAutomatic: true,
  //       locationId: 48,
  //       locationName: 'Austin Texas',
  //       makeName: '23323',
  //       meterType: '',
  //       modelName: '2323',
  //       modemId: 12,
  //       modemSerialNumber: 'MG75412',
  //       modifiedOn: '2022-12-28T09:50:16.3823002',
  //       multiplePorts: true,
  //       padId: 10,
  //       padName: 'Norseal PF10',
  //       pingSchedule: '',
  //       portType: 'MCS',
  //       powerCabinetId: 0,
  //       powerCabinetSerialNumber: null,
  //       protocolName: '1.6J',
  //       readingSchedule: '',
  //       rfidReader: 'E7130',
  //       rfidReaderId: 30,
  //       serialNumber: null,
  //       status: 'Offline',
  //       switchGearId: 13,
  //       switchGearName: 'GSELSPC5613',
  //     },
  //     {
  //       assetId: 'AssetTMZ',
  //       cableId: 0,
  //       cableSerialNumber: null,
  //       chargeBoxId: 'DO2210442490027',
  //       dispenserStatusId: 0,
  //       endPointUrl: '',
  //       firmwareVersion: '',
  //       fleetStation: false,
  //       hardwareSerialNumber: '1',
  //       id: 278,
  //       isActive: true,
  //       isAutomatic: true,
  //       locationId: 1,
  //       locationName: 'Philadelphia',
  //       makeName: 'Tesla',
  //       meterType: '',
  //       modelName: 'V3',
  //       modemId: 0,
  //       modemSerialNumber: '',
  //       modifiedOn: '2022-12-21T06:59:49.2703355',
  //       multiplePorts: true,
  //       padId: 0,
  //       padName: null,
  //       pingSchedule: '',
  //       portType: 'CHAdeMO',
  //       powerCabinetId: 0,
  //       powerCabinetSerialNumber: null,
  //       protocolName: '1.6J',
  //       readingSchedule: '',
  //       rfidReader: '',
  //       rfidReaderId: 0,
  //       serialNumber: null,
  //       status: 'Offline',
  //       switchGearId: 0,
  //       switchGearName: null,
  //     },
  //   ];
  //   let response:any;
  //   adminService.GetDispenserDetailsById(0).subscribe((res)=>{
  //      response=res.data
  //   })
  //  console.log(response,"this is respone");
  //  console.log(mockDataSource,"this is MOck Data Source");


  //   expect(component.dataSource.data.length).toEqual(mockDataSource.length);
  // });


});
