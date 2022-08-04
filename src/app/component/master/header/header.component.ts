import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/screen/login/login.service'
import { HeaderService } from './header.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggle: boolean = false
  role = ''
  showLoader = false
  constructor(
    public _headerService: HeaderService,
    public _router: Router,
    public _loginService: LoginService,
    private toastr: ToastrService,
  ) {
    this._headerService.subject.subscribe((elem) => {
      this.toggle = elem
    })
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || ''
  }

  toggleNav() {
    this.toggle = !this.toggle
    this._headerService.subject.next(this.toggle)
  }

  logout() {
    this.showLoader = true
    let email = localStorage.getItem('userEmail') || ''

    if (email !== '') {
      this._loginService.logout(email).subscribe({
        next: (response: any) => {
          this._router.navigate(['/login'])
        },
        error: (err) => {
          this.showLoader = false
          this.toastr.error('Something Went Wrong', 'Please Try Again')
        },
      })
    }
  }
}
