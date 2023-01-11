import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerInformationComponent } from './charger-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChargerInformationComponent', () => {
  let component: ChargerInformationComponent;
  let fixture: ComponentFixture<ChargerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ChargerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
