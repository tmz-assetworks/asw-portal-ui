import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { VehicleService } from '../manage-vehicles/vehicle.service'

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {
  vehicleList=[]

  displayedColumns: string[] = [
    'chargers',
    'locationname',
    'make',
    'model',
    'switchergear',
    'rfidreader',
    'protocol',
    'Status',
    'Action',
  ]


  dataSource = new MatTableDataSource<any>(this.vehicleList)
 

  constructor(private _vehicleService: VehicleService) {}

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
  }

  GetVehicleList(): void {


    this._vehicleService.GetVehicleList().subscribe(res=>{
      this.vehicleList = res.Data
      console.log(this.vehicleList,"data coming")
      this.dataSource.data = this.vehicleList
    })


  }


}
