import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ManageAdminUsersComponent } from './manage-admin-users.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ToastrModule } from 'ngx-toastr'
import { RouterTestingModule } from '@angular/router/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SuperAdminService } from '../super-admin.service'
import { MatTableModule } from '@angular/material/table'

describe('ManageAdminUsersComponent', () => {
  let component: ManageAdminUsersComponent
  let fixture: ComponentFixture<ManageAdminUsersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatTableModule,
      ],
      declarations: [ManageAdminUsersComponent],
      providers: [SuperAdminService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should call GetAllUsers() method on init', () => {
    const componentSpy = spyOn(component, 'getAdminList').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()

    component.ngOnInit()

    expect(componentSpy).toHaveBeenCalledTimes(1)
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
