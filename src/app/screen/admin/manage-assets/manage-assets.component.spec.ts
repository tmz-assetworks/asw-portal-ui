import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserTestingModule } from '@angular/platform-browser/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'

import { ManageAssetsComponent } from './manage-assets.component'

describe('ManageAssetsComponent', () => {
  let component: ManageAssetsComponent
  let fixture: ComponentFixture<ManageAssetsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatPaginatorModule,
      ],
      declarations: [ManageAssetsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssetsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should have page size 10', async () => {
    expect(component.pageSize).toEqual(10)
  })

  it('should have page size 10', async () => {
    expect(component.pageSize).toEqual(10)
  })
  it('should have current page  1', async () => {
    expect(component.currentPage).toEqual(1)
  })

  it('should call #GetAssetList() method on init', () => {
    const componentSpy = spyOn(component, 'getAssetList').and.callThrough()
    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()

    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should have header data ', async () => {
    let mockDisplayedColumns = [
      'type',
      'serialNumber',
      'location',
      'locationStatus',
      'Status',
      'Action',
    ]

    expect(component.displayedColumns).toEqual(mockDisplayedColumns)
  })
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
