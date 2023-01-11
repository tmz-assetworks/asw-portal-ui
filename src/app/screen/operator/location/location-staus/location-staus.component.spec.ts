import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStausComponent } from './location-staus.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationStausComponent', () => {
  let component: LocationStausComponent;
  let fixture: ComponentFixture<LocationStausComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ LocationStausComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
