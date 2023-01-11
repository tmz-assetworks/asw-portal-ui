import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ManageLocationsComponent } from './manage-locations.component'

describe('ManageLocationsComponent', () => {
  let component: ManageLocationsComponent
  let fixture: ComponentFixture<ManageLocationsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
      declarations: [ManageLocationsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLocationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
