import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { data } from '../../operator/dashboard/locations'
import { AdminService } from '../admin.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss'],
  imports:[
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    ReactiveFormsModule
  ]
})
export class ManageLocationsComponent implements OnInit {
  detais: any = data
  displayedColumns: string[] = [
    'locationId',
    'locationName',
    'addressLine1',
    'contactPersonName',
    'locationStatusName',
    'numberOfCharger',
    'action',
  ]
  // dataSource = new MatTableDataSource();

  // dataSource = new MatTableDataSource<Element>(this.customerList)
  adminList:string[] = []
  locationId: any
  isTableHasData: any
  // locationList: []
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  dataSource = new MatTableDataSource<any>()
  locationName: string = ''
  UserId: any
  //displayedColumns = ['Type', 'DateTime', 'SerialNumber', 'action']
  @ViewChild('input') inputValue: any
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private _router: Router,
    private _storageService: StorageService,
    public _adminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.locationName = ''
    let LocationData = this._storageService.getSessionData('LocationData')
    this._storageService.getSessionData('IsSaveBtn')

    if (LocationData) {
      this._storageService.removeSessionData('LocationData')
      this._storageService.removeSessionData('IsSaveBtn')
    }
    let addChargerLocation = this._storageService.getSessionData(
      'addChargerLocation',
    )

    if (addChargerLocation) {
      this._storageService.removeSessionData('addChargerLocation')
    }
  }

  ngOnInit() {
    this.GetLocationList()
  }

  searchKey: any

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  applyFilter() {
    // const filterValue = (event.target as HTMLInputElement).value;
    const filterValue = this.inputValue.nativeElement.value.toLowerCase()
    this.locationName = filterValue
    this.GetLocationList()
  }

  /**
   * view Location
   */
  viewLocation(data: any) {
    this._storageService.setSessionData('LocationData', JSON.stringify(data))
    this._storageService.setSessionData('IsSaveBtn', false)
    let viewLocationURL = `admin/locations/view-location`
    this._router.navigateByUrl(viewLocationURL)
  }

  /**
   * Edit Location
   */
  editLocation(data: any) {
    this._storageService.setSessionData('LocationData', JSON.stringify(data))
    this._storageService.setSessionData('IsSaveBtn', true)
    // let editLocationURl=`admin/locations/edit-location/${locationId}`
    let editLocationURl = `admin/locations/edit-location`
    this._router.navigateByUrl(editLocationURl)
  }

  /**
   * AddCharger-icon clicked
   */
  AddCharger(data: any) {
    this._storageService.setSessionData(
      'addChargerLocation',
      JSON.stringify(data),
    )
    this._router.navigateByUrl('admin/chargers/add-chargers')
  }
  statusData: any
  GetLocationList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.locationName == '' ? '' : this.locationName,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: '',
    }
    this._adminService.GetLocationList(body).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusData = res.statusList.statusData
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data

        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   *
   * @param event
   * Page Event
   */

  pageChange(event: any) {
    if (event.pageSize == this.pageSize) {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    } else {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    }
    this.GetLocationList()
  }

  // changeState(id: number, state: boolean) {
  //   // alert(state);
  //   let isActive = !state
  //   //
  //   const body = { id: id, isActive: isActive, userId: this.UserId }
  //   this._adminService.ChangeState(body).subscribe({
  //     next: (res) => {
  //       if (res.id !== undefined) {
  //         this.GetLocationList()
  //       }
  //     },
  //     error: (error) => {
  //       // console.log('error in api');
  //     },
  //   })
  // }
}
