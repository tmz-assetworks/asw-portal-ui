import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { DashboardService } from 'src/app/screen/operator/dashboard/dashboard.service'
import { StorageService } from 'src/app/service/storage.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
  imports:[SharedMaterialModule]
})
export class MatTableComponent implements OnInit {
  detailpagedata:string[] = []
  pageNumber = 1
  searchparam = ''
  pageSize = 10

  locationId: any
  duration = 1
  flag = 'chargerSession'
  locationstatus = 'locationstatus'
  operatorid: any
  displayedColumns: string[] = [
    'chargerName',
    'uid',
    'chargerType',
    'faultSince',
    'faultDescription',
    'timeReported',
    'locationId',
    'locationName',
  ]

  // dataSource = new MatTableDataSource();
  dataSource = new MatTableDataSource<any>(this.detailpagedata)
  isTableHasData: any
  UserId: any

  constructor(
    public _dashboardService: DashboardService,
    private _storageService: StorageService,
  ) {}

  ngOnInit() {
    //this.bar = false;
    this.getDetailpage(
      this.pageNumber,
      this.searchparam,
      this.pageSize,
      this.duration,
      this.flag,
      this.locationstatus,
    )
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

  getDetailpage(
    pageNumber: number,
    searchparam: any,
    pageSize: any,
    duration: any,
    flag: any,
    locationstatus: any,
  ) {
    //alert("1")
    const body = {
      pageNumber: pageNumber,
      searchparam: searchparam,
      pageSize: pageSize,
      duration: duration.toString(),
      orderBy: '',
      opratorid: this.UserId,
      locationIds: [] as number[],
      flag: flag,
      locationstatus: locationstatus,
    }
    this._dashboardService.GetChartDetailsList(body).subscribe((data) => {
      this.detailpagedata = data.data
      this.dataSource.data = this.detailpagedata
    })
  }
}
