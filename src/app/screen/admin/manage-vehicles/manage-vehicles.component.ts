import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { VehicleService } from './vehicle.service'

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {
  vehicleList=[]

  displayedColumns: string[] = [
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'Department',
    'DomicileLocation',
    'VehicleMacAddress',
    'RFIDCardAssigned',
    'Status',
    'Action',
  ]


  dataSource = new MatTableDataSource<any>(this.vehicleList)
  isTableHasData: any
 

  constructor(
    private _vehicleService: VehicleService,
    private _router: Router,
    private _storageService: StorageService
    ) {
      let VehicleData=this._storageService.getSessionData('VehicleData')
      this._storageService.getSessionData('IsSaveBtn')
      if(VehicleData)
        {this._storageService.removeSessionData('VehicleData')
        this._storageService.removeSessionData('IsSaveBtn')}
      
    }

  ngOnInit() {
    this.GetVehicleList()
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

  GetVehicleList(): void {
    this._vehicleService.GetVehicleList().subscribe(res=>{
      this.vehicleList = res.Data
      console.log(this.vehicleList,"data coming")
      this.dataSource.data = this.vehicleList
    })


  }

    /**
   * view Location
   */
     viewLocation(data: any) {
      this._storageService.setSessionData('VehicleData', data);
      this._storageService.setSessionData('IsSaveBtn', false);
      let viewLocationURL = `admin/vehicles/view-vehicle`;
      this._router.navigateByUrl(viewLocationURL);
    }
  
    /**
     * Edit Location 
     */
    editLocation(data: any) {
      this._storageService.setSessionData('VehicleData', data);
      this._storageService.setSessionData('IsSaveBtn', true);
      // let editLocationURl=`admin/locations/edit-location/${locationId}`
      let editLocationURl = `admin/vehicles/edit-vehicle`;
      this._router.navigateByUrl(editLocationURl);
    }


}
