import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { ManageOperatorUsersComponent } from './manage-operator-users.component'

describe('ManageOperatorUsersComponent', () => {
  let component: ManageOperatorUsersComponent
  let fixture: ComponentFixture<ManageOperatorUsersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [ManageOperatorUsersComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOperatorUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
