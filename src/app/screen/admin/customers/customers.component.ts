import { Component, OnInit } from '@angular/core'
import { AdminService } from '../admin.service'
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customerData: any

  constructor(
    private _adminService: AdminService,
    public _router: Router,
    private _route: ActivatedRoute,
      public _storageService: StorageService
    ) {
      let customerData = this._storageService.getSessionData('customerData');
      this._storageService.getSessionData('IsSaveBtn');
      if (customerData) {
        this._storageService.removeSessionData('customerData');
        this._storageService.removeSessionData('IsSaveBtn');
      }
    }
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
  
   /**
   * Edit Customer
   * @param id
   */
  editCusotmer(id: number) {
    this._router.navigateByUrl(`admin/customer/edit-customer?id=${id}`);
  }
}
