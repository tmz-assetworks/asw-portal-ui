import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInformationComponent } from './location-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationInformationComponent', () => {
  let component: LocationInformationComponent;
  let fixture: ComponentFixture<LocationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ LocationInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
