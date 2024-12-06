import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { HeaderService } from '../header/header.service';
import { of } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let mockHeaderService: jasmine.SpyObj<HeaderService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['getLocalData']);
    mockHeaderService = jasmine.createSpyObj('HeaderService', ['subject'], {
      subject: of({}),
    });

    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: StorageService, useValue: mockStorageService },
        { provide: HeaderService, useValue: mockHeaderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize correctly', () => {
      spyOn(component, 'loadMenu');
      component.ngOnInit();
      expect(component.loadMenu).toHaveBeenCalled();
    });
  });

  describe('loadMenu', () => {
    it('should load menu items based on role - Operator', () => {
      spyOn(localStorage, 'getItem').and.returnValue('Operator');
      component.loadMenu();
      expect(component.menuItems.length).toBeGreaterThan(0);
      expect(component.menuItems.some((item) => item.text === 'Dashboard')).toBe(true);
    });

    it('should load menu items based on role - Admin', () => {
      spyOn(localStorage, 'getItem').and.returnValue('Admin');
      component.loadMenu();
      expect(component.menuItems.length).toBeGreaterThan(0);
      expect(
        component.menuItems.some((item) => item.text === 'Profile')
      ).toBe(true);
    });

    it('should navigate to login if role is invalid', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      component.loadMenu();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  describe('home', () => {
    it('should navigate to Operator home when role is Operator', () => {
      mockStorageService.getLocalData.and.returnValue('Operator');
      component.home();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('operator');
    });

    it('should navigate to SuperAdmin home when role is SuperAdmin', () => {
      mockStorageService.getLocalData.and.returnValue('SuperAdmin');
      component.home();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('superadmin');
    });

    it('should navigate to Admin dashboard when role is Admin', () => {
      mockStorageService.getLocalData.and.returnValue('Admin');
      component.home();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('admin/dashboard');
    });
  });

  describe('toggleSubMenu', () => {
    it('should toggle submenu open state', () => {
      component.menuItems = [
        { text: 'Master', isOpen: false },
        { text: 'Profile', isOpen: false },
      ];
      component.toggleSubMenu(0);
      expect(component.menuItems[0].isOpen).toBeTrue();
      component.toggleSubMenu(0);
      expect(component.menuItems[0].isOpen).toBeFalse();
    });
  });

  describe('clickout', () => {
    it('should toggle messages state when clicked outside', () => {
      component.wasInside = false;
      component.clickout({ target: { id: 900922 } });
      expect(component.messages).toBeTrue();
    });

    it('should not toggle messages state when clicked inside', () => {
      component.wasInside = true;
      component.clickout({ target: { id: 900923 } });
      expect(component.messages).toBeFalse();
    });
  });
});
