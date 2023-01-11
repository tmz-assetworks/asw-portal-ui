import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LocationInnerComponent } from './location-inner.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('LocationInnerComponent', () => {
  let component: LocationInnerComponent
  let fixture: ComponentFixture<LocationInnerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [LocationInnerComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInnerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
