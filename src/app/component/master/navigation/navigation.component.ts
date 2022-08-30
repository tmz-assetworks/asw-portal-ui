import {
  HostListener,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { StorageService } from 'src/app/service/storage.service'
import { HeaderService } from '../header/header.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('leftPanel', { read: ElementRef, static: false })
  //@Input() makeDifferent;
  messages: boolean = false
  isExpanded: boolean = true
  isExpandedState = true
  subscription: Subscription
  menuItems: any[] = []
  private wasInside = false
  private clicked = false
  constructor(
    public _headerService: HeaderService,
    ele: ElementRef,
    public _router: Router,
    public _storageService: StorageService,
  ) {
    this.loadMenu()
    this.subscription = this._headerService.subject.subscribe((message) => {
      this.clicked = true
      const value = document.getElementsByClassName('nav-block2')
      if (this.messages) {
        value[0].classList.add('col-md-6')
      } else {
        value[0].classList.remove('col-md-6')
      }
    })
  }

  @HostListener('click')
  clickInside() {
    this.wasInside = true
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.id != 900923) {
      if (!this.wasInside && window.innerWidth < 992) {
        this.messages = true
      }
      this.wasInside = false
    } else {
      this.messages = !this.messages
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {}

  loadMenu() {
    const role = localStorage.getItem('role')
    if (role == 'Operator') {
      this.menuItems = [
        {
          routerLink: ['dashboard'],
          text: 'Dashboard',
          icon: 'assets/icons/dashboard.png',
        },
        {
          routerLink: ['location'],
          text: 'Locations',
          icon: '../../../../assets/icons/locations.png',
        },
        {
          routerLink: ['charger'],
          text: 'Chargers',
          icon: '../../../../assets/icons/chargers.png',
        },
        {
          routerLink: ['diagonstics'],
          text: 'Diagnostics',
          icon: '../../../../assets/icons/diagnostics.png',
        },
        {
          routerLink: ['vehicles'],
          text: 'Vehicles',
          icon: '../../../../assets/icons/vehicles.png',
        },
        {
          routerLink: ['reports/report-session'],
          text: 'Reports',
          icon: '../../../../assets/icons/reports.png',
        },
        {
          routerLink: ['alerts'],
          text: 'Alerts',
          icon: '../../../../assets/icons/Alert.png',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/icons/help.png',
        },
      ]
    } else if (role == 'SuperAdmin') {
      this.menuItems = [
        {
          routerLink: ['customer'],
          text: 'Customer Setup',
          icon: '../../../../assets/sidenavbar-icons/customer-setup.png',
        },
        {
          routerLink: ['admin'],
          text: 'AssetWorks Admins',
          icon: '../../../../assets/sidenavbar-icons/assetworks.png',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/sidenavbar-icons/help.png',
        },
      ]
    } else if (role == 'Admin') {
      this.menuItems = [
        {
          routerLink: ['customer'],
          text: 'Customers',
          icon: '../../../../assets/icons/customers.png',
        },
        {
          routerLink: ['operator-user'],
          text: 'Operator Users',
          icon: '../../../../assets/icons/operator.png',
        },
        
        {
          routerLink: ['locations'],
          text: 'Locations',
          icon: '../../../../assets/icons/locations.png',
        },
        {
          routerLink: ['vehicles'],
          text: 'Vehicles',
          icon: '../../../../assets/icons/vehicle.png',
        },
        {
          routerLink: ['chargers'],
          text: 'Chargers',
          icon: '../../../../assets/icons/charger.png',
        },
        {
          routerLink: ['assets'],
          text: 'Assets',
          icon: '../../../../assets/icons/assets.png',
        },
        {
          routerLink: ['pricing'],
          text: 'Pricing',
          icon: '../../../../assets/icons/pricing.png',
        },
        {
          routerLink: ['subscriptions-plans'],
          text: 'Subscription Plans',
          icon: '../../../../assets/icons/Subscription.svg',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/icons/help.png',
        },
      ]
    } else {
      this._router.navigate(['/login'])
    }
  }

  /**
   * Redirects the user to the home page
   */
  home() {
    const role = this._storageService.getLocalData('role')

    if (role === 'Operator') {
      this._router.navigateByUrl('operator')
    } else if (role === 'SuperAdmin') {
      this._router.navigateByUrl('superadmin')
    } else {
      this._router.navigateByUrl('admin')
    }
  }
  ngAfterViewInit() {}
}
