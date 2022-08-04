import { LocationService } from './../location.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-location-chargers',
  templateUrl: './location-chargers.component.html',
  styleUrls: ['./location-chargers.component.scss'],
})
export class LocationChargersComponent implements OnInit {
  UserId: any
  selectedLocationId: any
  locationName: string | null
  isTableHasData = false

  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selectedLocationId = this._storageService.getSessionData('locationId')
    this.locationName = this._storageService.getSessionData('locationName')
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit() {
    this.locationChargerList(this.selectedLocationId)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  locationChargerList(locationId: any) {
    this._locationService
      .GetlocationChargerList([locationId])
      .subscribe((data: any) => {
        this.dataSource.data = data.data
      })
  }

  displayedColumns: string[] = [
    'chargeBoxId',
    'dispenserName',
    'dispenserMake',
    'dispenserModel',
    'connectorType',
    'protocolName',
    'chargerStatus',
    'noofPort',
    'action',
  ]
  dataSource = new MatTableDataSource()

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = false
    } else {
      this.isTableHasData = true
    }
  }
}
