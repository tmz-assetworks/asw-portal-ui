import { Router } from '@angular/router'
import { MatFormFieldControl } from '@angular/material/form-field'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { SuperAdminService } from '../super-admin.service'

@Component({
  selector: 'app-manage-admin-users',
  templateUrl: './manage-admin-users.component.html',
  styleUrls: ['./manage-admin-users.component.scss'],
})
export class ManageAdminUsersComponent implements OnInit {
  adminList = []

  constructor(
    public _superAdminService: SuperAdminService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.getAdminList()
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator

  searchKey: any

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  displayedColumns: string[] = [
    'CustomerName',
    'AdminName',
    'EmailId',
    'Country',
    'Status',
    'Action',
  ]
  dataSource = new MatTableDataSource()

  getAdminList() {
    this._superAdminService.adminList().subscribe((data) => {
      this.adminList = data.Data

      this.dataSource.data = this.adminList
    })
  }
  // btnClick=  () => {
  //   this._router.navigateByUrl('admin/createadmin');
  // };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  showAdminList: boolean = true
  showCreateAdmin: boolean = false
}

export interface PeriodicElement {
  CustomerName: string
  AdminName: string
  Email: string
  Country: string
  Status: string
  Action: string
}
