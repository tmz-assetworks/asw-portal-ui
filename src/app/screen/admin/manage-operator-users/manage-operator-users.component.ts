import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ToastrService } from 'ngx-toastr'
import { OperatorService } from '../operator.service'

@Component({
  selector: 'app-manage-operator-users',
  templateUrl: './manage-operator-users.component.html',
  styleUrls: ['./manage-operator-users.component.scss'],
})
export class ManageOperatorUsersComponent implements OnInit {
  customerList = []
  displayedColumns: string[] = [
    'customername',
    'customerid',
    'customeremail',
    'phonenumber',
    'action',
  ]
  // dataSource = new MatTableDataSource();

  dataSource = new MatTableDataSource<Element>(this.customerList)

  constructor(private operator: OperatorService,private toastr: ToastrService) {}

  ngOnInit() {
    this.getCustomerList()
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

  getCustomerList(): void {
    this.operator.getCustomertList().subscribe((data: any) => {
      //console.log(data,"data is coming");
      this.customerList = data.data
      this.dataSource.data = this.customerList
    })
  }

  addCustomers(): void {
    this.toastr.success('Your Record Added Coming Soon....')
  }
}
