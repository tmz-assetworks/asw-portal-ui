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
          icon: '../../../../assets/Operator/Dashboard.svg',
        },
        {
          routerLink: ['location'],
          text: 'Locations',
          icon: '../../../../assets/Operator/Locations.svg',
        },
        {
          routerLink: ['charger'],
          text: 'Chargers',
          icon: '../../../../assets/Operator/Charger.svg',
        },
        {
          routerLink: ['diagonstics'],
          text: 'Diagnostics',
          icon: '../../../../assets/Operator/Diagnostics.svg',
        },
        {
          routerLink: ['vehicles'],
          text: 'Vehicles',
          icon: '../../../../assets/Operator/Vehicles.svg',
        },
        {
          routerLink: ['reports'],
          text: 'Reports',
          icon: '../../../../assets/Operator/Reports.svg',
        },
        {
          routerLink: ['alerts'],
          text: 'Alerts',
          icon: '../../../../assets/Operator/Alerts.svg',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/Operator/Helps.svg',
        },
      ]
    } else if (role == 'SuperAdmin') {
      this.menuItems = [
        {
          routerLink: ['customer'],
          text: 'Organization Setup',
          icon: '../../../../assets/Super-Admin-icons/nav.svg',
        },
        {
          routerLink: ['admin'],
          text: ' Admin Users',
          icon: '../../../../assets/Super-Admin-icons/nav1.svg',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/Super-Admin-icons/nav2.svg',
        },
      ]
    } else if (role == 'Admin') {
      this.menuItems = [
        {
          routerLink: ['profile'],
          text: 'Profile',
          icon: '../../../../assets/Admin-SideNav/Customer.svg',
        },
        {
          routerLink: ['users'],
          text: 'Users',
          icon: '../../../../assets/Admin-SideNav/Operator-Users.svg',
        },

        {
          routerLink: ['locations'],
          text: 'Locations',
          icon: '../../../../assets/Admin-SideNav/Location.svg',
        },
        {
          routerLink: ['vehicles'],
          text: 'Vehicles',
          icon: '../../../../assets/Admin-SideNav/Vehicles.svg',
        },
        {
          routerLink: ['chargers'],
          text: 'Chargers',
          icon: '../../../../assets/Admin-SideNav/Charger.svg',
        },
        {
          routerLink: ['assets'],
          text: 'Assets',
          icon: '../../../../assets/Admin-SideNav/Assets.svg',
        },
        {
          routerLink: ['pricing'],
          text: 'Pricing',
          icon: '../../../../assets/Admin-SideNav/Pricing.svg',
        },
        {
          routerLink: ['subscriptions-plans'],
          text: 'Subscription Plans',
          icon: '../../../../assets/icons/Subscription.svg',
        },
        {
          routerLink: ['help'],
          text: 'Help',
          icon: '../../../../assets/Admin-SideNav/Help.svg',
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
      this._router.navigateByUrl('admin/profile')
    }
  }
  ngAfterViewInit() {}
}
