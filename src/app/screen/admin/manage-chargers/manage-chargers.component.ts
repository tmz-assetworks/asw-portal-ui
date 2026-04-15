import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../admin.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { InputTooltipDirective } from 'src/app/shared/directive/input-tooltip.directive'
import Swal from 'sweetalert2'

@Component({
	selector: 'app-manage-chargers',
	templateUrl: './manage-chargers.component.html',
	styleUrls: ['./manage-chargers.component.scss'],
	imports: [
		SharedMaterialModule,
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		InputTooltipDirective
	]
})
export class ManageChargersComponent implements OnInit {
	locationList: any
	locationIdResponse: any = []
	submitted = false
	totalCount: any
	pageSize: number = 10
	currentPage: number = 1
	totalPages: any
	pageSizeOptions = [10, 20, 100]
	searchParam = ''
	UserId: string | null

	isTableHasData = false

	displayedColumns: string[] = [
		'assetId',
		'chargeBoxId',
		'locationName',
		'make',
		'model',
		'status',
		'protocol',
		'simCardMSIDN',
		'Action',
	]

	dataSource = new MatTableDataSource<any>([])

	portType: any

	constructor(
		public _storageService: StorageService,
		private _router: Router,
		private _adminService: AdminService,
		private readonly _AdminService: AdminService,
		public _fb: FormBuilder,
		private readonly _toastr: ToastrService,
		private __toastr: ToastrService,
	) {
		this.UserId = this._storageService.getLocalData('user_id')

		let addChargerLocation = this._storageService.getSessionData(
			'addChargerLocation',
		)

		if (addChargerLocation) {
			this._storageService.removeSessionData('addChargerLocation')
		}
	}

	ngOnInit() {
		this.GetLocationName()
		this.GetDispensersWithPagination()
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator

	searchKey: string = ''

	ngAfterViewInit() {
		this.paginator._intl.itemsPerPageLabel = 'Rows per page'
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.searchParam = filterValue
		this.GetDispensersWithPagination()
	}

	/**
	 * view Charger
	 */
	viewCharger(id: string) {
		this._router.navigateByUrl(`/admin/chargers/view-chargers?id=${id}`)
	}

	/**
	 * Edit Charger
	 */
	editCharger(id: string) {
		this._router.navigateByUrl(`/admin/chargers/edit-chargers?id=${id}`)
	}

	/**
	 * Get Charger List
	 */
	GetDispensersWithPagination() {
		const searchParameter = this.searchFilter.value;
		const pBody = {
			pageNumber: this.currentPage,
			searchParam: this.searchParam,
			pageSize: this.pageSize,
			orderBy: '',
			operatorId: this.UserId,
			locationIds: searchParameter.locationId ?? [],
			activationStatus: searchParameter.activationStatus ?? null
		}
		this._adminService.GetDispensersWithPagination(pBody).subscribe((res) => {
			if (res.data !== undefined && res.data != null && res.data.length > 0) {
				this.totalCount = res.paginationResponse.totalCount
				this.totalPages = res.paginationResponse.totalPages
				this.pageSize = res.paginationResponse.pageSize

				this.dataSource.data = res.data;
				// console.log(this.dataSource.data,"HOORYYEE");

				this.portType = res.portType

				this.isTableHasData = false
			} else {
				this.dataSource.data = []
				this.isTableHasData = true
			}
		})
	}

	/**
	 *
	 * @param event
	 * Page Event
	 */

	pageChange(event: any) {
		if (event.pageSize == this.pageSize) {
			this.currentPage =
				event.previousPageIndex < event.pageIndex
					? this.currentPage + 1
					: this.currentPage - 1
		} else {
			this.currentPage = 1
			this.pageSize = event.pageSize
			this.paginator.pageIndex = 0
		}

		this.GetDispensersWithPagination()
	}


	searchFilter = this._fb.group({
		searchText: new FormControl<string>(''),
		locationId: new FormControl<number[]>([]),      // multi-select
		activationStatus: new FormControl<number | null>(null) // Active / Deactive
	});

	GetLocationName() {
		this._AdminService.GetLocationName().subscribe((res: any) => {
			this.locationList = res.data
		})
	}

	onSelectLocation(event: any, id: any) {
		if (event.isUserInput) {
			const index = this.locationIdResponse.indexOf(id)
			if (index === -1) {
				this.locationIdResponse.push(id)
			} else {
				this.locationIdResponse.splice(index, 1)
			}
		}
	}

	@ViewChild('input') searchInput!: any;
	resetFilter(): void {
		// Clear selected location IDs (used in your custom logic)
		this.locationIdResponse = [];

		// Reset form with correct defaults
		this.searchFilter.reset({
			searchText: '',
			locationId: [],
			activationStatus: null
		});

		// Reset validation state
		this.submitted = false;
		this.searchFilter.markAsPristine();
		this.searchFilter.markAsUntouched();

		// Clear search input text
		if (this.searchInput) {
			this.searchInput.nativeElement.value = '';
		}
		this.searchParam = '';

		// Reset pagination
		this.currentPage = 1;
		if (this.paginator) {
			this.paginator.pageIndex = 0;
		}

		// Reload full list
		this.GetDispensersWithPagination();
	}

	/**
   * Make vehicle active/ inactive
   * @param id
   * @param status
   */

	IsActiveDispenserById(id: any, status: boolean): void {
		const pbody = {
			id,
			isActive: status,
			modifiedBy: this.UserId
		};

		this._adminService.IsActiveDispenserById(pbody).subscribe(res => {
			if (!res) {
				return;
			}

			const successMessage = status
				? 'Record active successfully'
				: 'Record inactive successfully';

			this._toastr.success(successMessage);
			this.GetDispensersWithPagination();
		});
	}

	/**
 * Delete charger after confirmation
 */
	confirmDeleteCharger(id: number): void {
		Swal.fire({
			title: '<strong>Are you sure you want to delete this Charger? This action cannot be undone.</strong>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Confirm',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#0062A6',
			cancelButtonColor: '#E6E8E9',
			allowOutsideClick: false,
			allowEscapeKey: false
		}).then((result) => {
			if (!result.isConfirmed) return;

			this._adminService.DeleteDispenserById(id).subscribe({
				next: ({ statusCode, statusMessage }) => {
					if (statusCode === 200) {
						this.__toastr.success(statusMessage);
						this.GetDispensersWithPagination();
					} else {
						this.__toastr.error(statusMessage);
					}
				},
				error: ({ error, status }) => {
					const message =
						error?.statusMessage ||
						error?.errors ||
						'Unable to delete charger';
					this.__toastr.error(message);
				}
			});
		});
	}

}
