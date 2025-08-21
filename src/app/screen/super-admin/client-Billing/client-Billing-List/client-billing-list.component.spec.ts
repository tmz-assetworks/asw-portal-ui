import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClientBillingListComponent } from './client-billing-list.component';
import { ClientBillingService } from '../client-billing.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClientBillingListComponent', () => {
  let component: ClientBillingListComponent;
  let fixture: ComponentFixture<ClientBillingListComponent>;
  let mockService: jasmine.SpyObj<ClientBillingService>;
  let router: Router;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ClientBillingService', ['getAllClientBillings']);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ClientBillingListComponent],
      providers: [
        { provide: ClientBillingService, useValue: mockService },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore mat-* unknown tags
    }).compileComponents();

    fixture = TestBed.createComponent(ClientBillingListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadClientBillings', () => {
    it('should load data when service returns results', () => {
      mockService.getAllClientBillings.and.returnValue(of({
        data: [{ id: 1, customer: 'Test', chargerType: 'AC' }],
        statusData: {},
        paginationResponse: { totalCount: 1, totalPages: 1, pageSize: 10 }
      }));

      component.loadClientBillings();

      expect(component.dataSource.data.length).toBe(1);
      expect(component.isTableHasData).toBeFalse();
    });

    it('should set isTableHasData to true when no results', () => {
      mockService.getAllClientBillings.and.returnValue(of({ data: [] }));

      component.loadClientBillings();

      expect(component.dataSource.data.length).toBe(0);
      expect(component.isTableHasData).toBeTrue();
    });
  });

  describe('performAction', () => {
    beforeEach(() => {
      spyOn(router, 'navigate');
      sessionStorage.clear();
    });

    it('should navigate to view-client-billing and set sessionStorage', () => {
      const data = { id: 1 };
      component.performAction('view', data);

      expect(sessionStorage.getItem('adminData')).toBe(JSON.stringify(data));
      expect(sessionStorage.getItem('saveBtn')).toBe('false');
      expect(router.navigate).toHaveBeenCalledWith(['view-client-billing'], { relativeTo: {} as any });
    });

    it('should navigate to edit-client-billing and set sessionStorage', () => {
      const data = { id: 1 };
      component.performAction('edit', data);

      expect(sessionStorage.getItem('adminData')).toBe(JSON.stringify(data));
      expect(sessionStorage.getItem('saveBtn')).toBe('true');
      expect(router.navigate).toHaveBeenCalledWith(['edit-client-billing'], { relativeTo: {} as any });
    });

    it('should navigate to create-client-billing when type is unknown', () => {
      component.performAction('something');

      expect(router.navigate).toHaveBeenCalledWith(['create-client-billing'], { relativeTo: {} as any });
    });
  });

  it('should toggle changeState correctly', () => {
    const spy = spyOn(component as any, 'changeState').and.callThrough();
    component.changeState(1, true);
    expect(spy).toHaveBeenCalledWith(1, true);
  });

  it('should apply filter', () => {
    component.inputValue = { nativeElement: { value: 'CMS Dev' } };
    component.applyFilter(new Event('keyup'));
    expect(component.inputValue.nativeElement.value).toBe('CMS Dev');
  });

  describe('pageChange', () => {
    it('should reset currentPage when pageSize changes', () => {
      component.pageSize = 10;
      component.currentPage = 2;
      component.paginator = { pageIndex: 1 } as any;

      component.pageChange({ pageSize: 20 });
      expect(component.currentPage).toBe(1);
      expect(component.pageSize).toBe(20);
      expect(component.paginator.pageIndex).toBe(0);
    });

    it('should increment currentPage when going forward', () => {
      component.currentPage = 1;
      component.pageSize = 10;

      component.pageChange({ previousPageIndex: 0, pageIndex: 1, pageSize: 10 });
      expect(component.currentPage).toBe(2);
    });

    it('should decrement currentPage when going backward', () => {
      component.currentPage = 2;
      component.pageSize = 10;

      component.pageChange({ previousPageIndex: 1, pageIndex: 0, pageSize: 10 });
      expect(component.currentPage).toBe(1);
    });
  });
});
