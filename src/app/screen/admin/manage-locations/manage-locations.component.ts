import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { data } from '../../operator/dashboard/locations'
import { OperatorService } from '../operator.service'

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss'],
})
export class ManageLocationsComponent implements OnInit {
  detais: any = data
  customerList = []
  displayedColumns: string[] = [
    'locationid',
    'locationname',
    'locationaddresss',
    'locationcontactname',
    'locationstatus',
    'noofcharges',
    'action',
  ]
  // dataSource = new MatTableDataSource();

  dataSource = new MatTableDataSource<Element>(this.customerList)
  adminList = []
  locationId: any
  isTableHasData: any

  constructor(
    private operatorService: OperatorService,
    private _router: Router,
    private _storageService: StorageService,
  ) {
    let LocationData = this._storageService.getSessionData('LocationData')
    this._storageService.getSessionData('IsSaveBtn')
    if (LocationData) {
      this._storageService.removeSessionData('LocationData')
      this._storageService.removeSessionData('IsSaveBtn')
    }
  }

  ngOnInit() {
    this.adminLocationTableData()
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator

  searchKey: any

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = false
    } else {
      this.isTableHasData = true
    }
  }

  adminLocationTableData() {
    this.operatorService.adminLocationTableData().subscribe((data) => {
      this.adminList = data.Data
      // console.log(this.adminList,"data coming")

      this.dataSource.data = this.adminList
    })
  }

  /**
   * view Location
   */
  viewLocation(data: any) {
    this._storageService.setSessionData('LocationData', data)
    this._storageService.setSessionData('IsSaveBtn', false)
    let viewLocationURL = `admin/locations/view-location`
    this._router.navigateByUrl(viewLocationURL)
  }

  /**
   * Edit Location
   */
  editLocation(data: any) {
    this._storageService.setSessionData('LocationData', data)
    this._storageService.setSessionData('IsSaveBtn', true)
    // let editLocationURl=`admin/locations/edit-location/${locationId}`
    let editLocationURl = `admin/locations/edit-location`
    this._router.navigateByUrl(editLocationURl)
  }

  /**
   * AddChareger-icon clicked
   */
  AddChareger() {
    this._router.navigateByUrl('admin/chargers/add-chargers')
    console.log('AddChareger Clicked')
  }
}
