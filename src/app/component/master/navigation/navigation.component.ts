import {
  HostListener,
  Component,
  ElementRef,
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
export class NavigationComponent {
  @ViewChild('leftPanel', { read: ElementRef, static: false })
  private readonly ROLE_OPERATOR = 'Operator';
private readonly ROLE_SUPER_ADMIN = 'SuperAdmin';
private readonly ROLE_ADMIN = 'Admin';

// Base paths for icons to avoid repetition
private readonly ICON_BASE_OPERATOR = '../../../../assets/Operator/';
private readonly ICON_BASE_SUPER_ADMIN = '../../../../assets/Super-Admin-icons/';
private readonly ICON_BASE_ADMIN = '../../../../assets/Admin-SideNav/';
  //@Input() makeDifferent;
  messages: boolean = false
  isExpanded: boolean = true
  isExpandedState = true
  subscription: Subscription
  menuItems: any[] = []
  public wasInside = false
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
        value[0]?.classList.add('col-md-6')
      } else {
        value[0]?.classList.remove('col-md-6')
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

  loadMenu(): void {
  const role = localStorage.getItem('role');

  switch (role) {
    case this.ROLE_OPERATOR:
      this.menuItems = this.getOperatorMenu();
      break;

    case this.ROLE_SUPER_ADMIN:
      this.menuItems = this.getSuperAdminMenu();
      break;

    case this.ROLE_ADMIN:
      this.menuItems = this.getAdminMenu();
      break;

    default:
      this._router.navigate(['/login']);
      break;
  }
}

// Extracted methods for each role menu

private getOperatorMenu() {
  return [
    { routerLink: ['dashboard'], text: 'Dashboard', icon: this.ICON_BASE_OPERATOR + 'Dashboard.svg' },
    { routerLink: ['location'], text: 'Locations', icon: this.ICON_BASE_OPERATOR + 'Locations.svg' },
    { routerLink: ['charger'], text: 'Chargers', icon: this.ICON_BASE_OPERATOR + 'Charger.svg' },
    { routerLink: ['diagonstics'], text: 'Diagnostics', icon: this.ICON_BASE_OPERATOR + 'Diagnostics.svg' },
    { routerLink: ['vehicles'], text: 'Vehicles', icon: this.ICON_BASE_OPERATOR + 'Vehicles.svg' },
    { routerLink: ['reports'], text: 'Reports', icon: this.ICON_BASE_OPERATOR + 'Reports.svg' },
    { routerLink: ['alerts'], text: 'Alerts', icon: this.ICON_BASE_OPERATOR + 'Alerts.svg' },
    { routerLink: ['help'], text: 'Help', icon: this.ICON_BASE_OPERATOR + 'Helps.svg' },
  ];
}

private getSuperAdminMenu() {
  return [
    { routerLink: ['customer'], text: 'Organization Setup', icon: this.ICON_BASE_SUPER_ADMIN + 'nav.svg' },
    { routerLink: ['admin'], text: 'Admin Users', icon: this.ICON_BASE_SUPER_ADMIN + 'nav1.svg' },
    { routerLink: ['report'], text: 'Client Billing Reports', icon: this.ICON_BASE_SUPER_ADMIN + 'Reports.svg' },
    {routerLink:['client-billing-config'],text:'Client Billing Configuration',icon:this.ICON_BASE_SUPER_ADMIN + 'Reports.svg'},
    { routerLink: ['help'], text: 'Help', icon: this.ICON_BASE_SUPER_ADMIN + 'nav2.svg' },
  ];
}

private getAdminMenu() {
  return [
    {
      routerLink: ['dashboard'],
      text: 'Dashboard',
      icon: this.ICON_BASE_OPERATOR + 'Dashboard.svg',
    },
    {
      routerLink: ['location'],
      text: 'Locations',
      icon: this.ICON_BASE_OPERATOR + 'Locations.svg',
    },
    {
      routerLink: ['charger'],
      text: 'Chargers',
      icon: this.ICON_BASE_OPERATOR + 'Charger.svg',
    },
    {
      text: 'Admin Setup',
      icon: this.ICON_BASE_ADMIN + 'account-cog.svg',
      isOpen: false,
      subMenu: [
        { routerLink: ['admin-users'], text: 'Edit Admins', icon: this.ICON_BASE_ADMIN + 'Operator-Users.svg' },
        { routerLink: ['users'], text: 'Edit Users', icon: this.ICON_BASE_ADMIN + 'Operator-Users.svg' },
        { routerLink: ['locations'], text: 'Edit Locations', icon: this.ICON_BASE_ADMIN + 'Location.svg' },
        { routerLink: ['chargers'], text: 'Edit Chargers', icon: this.ICON_BASE_ADMIN + 'Charger.svg' },
        { routerLink: ['assets'], text: 'Edit Assets', icon: this.ICON_BASE_ADMIN + 'Assets.svg' },
        { routerLink: ['vehicles'], text: 'Edit Vehicles', icon: this.ICON_BASE_ADMIN + 'Vehicles.svg' },
        { routerLink: ['pricing'], text: 'Edit Pricing', icon: this.ICON_BASE_ADMIN + 'Pricing.svg' },
      ],
    },
    {
      routerLink: ['diagonstics'],
      text: 'Diagnostics',
      icon: this.ICON_BASE_OPERATOR + 'Diagnostics.svg',
    },
    {
      routerLink: ['reports'],
      text: 'Reports',
      icon: this.ICON_BASE_OPERATOR + 'Reports.svg',
    },
    {
      routerLink: ['help'],
      text: 'Help',
      icon: this.ICON_BASE_ADMIN + 'Help.svg',
    },
  ];
}

  toggleSubMenu(index: number): void {
    this.menuItems[index].isOpen = !this.menuItems[index].isOpen;
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
      this._router.navigateByUrl('admin/dashboard')
    }
  }

}
