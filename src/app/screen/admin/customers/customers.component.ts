import { Component, OnInit } from '@angular/core'
import { AdminService } from '../admin.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customerData: any

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this.getCustomerInfo(0)
  }
  /**
   * Get Profile Data
   */

  getCustomerInfo(id: any) {
    this._adminService.Getcustomer(id).subscribe((res) => {
      if (res.data) {
        this.customerData = res.data[0]
      }
    })
  }
}
