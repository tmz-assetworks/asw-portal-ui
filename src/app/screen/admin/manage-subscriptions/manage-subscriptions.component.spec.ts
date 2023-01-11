import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'
import { ManageSubscriptionsComponent } from './manage-subscriptions.component'

describe('ManageSubscriptionsComponent', () => {
  let component: ManageSubscriptionsComponent
  let fixture: ComponentFixture<ManageSubscriptionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [ManageSubscriptionsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubscriptionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
