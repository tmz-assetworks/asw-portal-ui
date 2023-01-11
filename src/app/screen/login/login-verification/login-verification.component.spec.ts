import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVerificationComponent } from './login-verification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginVerificationComponent', () => {
  let component: LoginVerificationComponent;
  let fixture: ComponentFixture<LoginVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,ToastrModule.forRoot(),HttpClientTestingModule],
      declarations: [ LoginVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
