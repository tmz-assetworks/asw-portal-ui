import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerEventComponent } from './charger-event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChargerEventComponent', () => {
  let component: ChargerEventComponent;
  let fixture: ComponentFixture<ChargerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,MatTableModule,MatTableExporterModule,MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ ChargerEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
