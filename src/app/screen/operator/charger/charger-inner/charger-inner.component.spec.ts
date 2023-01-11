import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerInnerComponent } from './charger-inner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChargerInnerComponent', () => {
  let component: ChargerInnerComponent;
  let fixture: ComponentFixture<ChargerInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ ChargerInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
