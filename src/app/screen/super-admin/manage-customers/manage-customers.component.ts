import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { SuperAdminService } from '../super-admin.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  customerList = []
  showCustomersList: boolean = true
  showAddCustomer: boolean = false

  displayedColumns: string[] = [
    'OrganisationName',
    'OrganisationId',
    'PointOfContact',
    'CustomerEmail',
    'PhoneNumber',
    'Status',
    'NumberOfEvChargers',
    'Assets',
    'User',
    'action',
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Element>(this.customerList)

  constructor(public _superAdminService: SuperAdminService) {}

  ngOnInit() {
    this.getCustomerList()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  /**
   *
   * @param event
   * Search Filter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  /**
   * Get Customer List
   */

  getCustomerList(): void {
    this._superAdminService.getCustomertList().subscribe((data: any) => {
      this.customerList = data.Data

      this.dataSource.data = this.customerList
    })
  }
}
