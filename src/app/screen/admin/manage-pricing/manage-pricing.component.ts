import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { VehicleService } from '../manage-vehicles/vehicle.service'

@Component({
  selector: 'app-manage-pricing',
  templateUrl: './manage-pricing.component.html',
  styleUrls: ['./manage-pricing.component.scss']
})
export class ManagePricingComponent implements OnInit {

  vehicleList=[]

  displayedColumns: string[] = [
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'Department',
    'DomicileLocation',
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
      let PricingData=this._storageService.getSessionData('PricingData')
      this._storageService.getSessionData('IsSaveBtn')
      if(PricingData)
        {this._storageService.removeSessionData('PricingData')
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
      this._storageService.setSessionData('PricingData', data);
      this._storageService.setSessionData('IsSaveBtn', false);
      let viewLocationURL = `admin/pricing/view-pricing`;
      this._router.navigateByUrl(viewLocationURL);
    }
  
    /**
     * Edit Location 
     */
    editLocation(data: any) {
      this._storageService.setSessionData('PricingData', data);
      this._storageService.setSessionData('IsSaveBtn', true);
      // let editLocationURl=`admin/locations/edit-location/${locationId}`
      let editLocationURl = `admin/pricing/edit-pricing`;
      this._router.navigateByUrl(editLocationURl);
    }
}