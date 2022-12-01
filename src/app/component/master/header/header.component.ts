import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/screen/login/login.service'
import { HeaderService } from './header.service'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { UserprofileService } from 'src/app/screen/user-profile/user-profile.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggle: boolean = false

  showLoader = false

  username: string | null | undefined

  UserId: string | null
  countByUserId: any
  role: string | null
  profileImg: any

  constructor(
    public _headerService: HeaderService,
    public _router: Router,
    public _loginService: LoginService,
    private toastr: ToastrService,
    private _storageService: StorageService,
    private _UserProfileService: UserprofileService,
  ) {
    this._headerService.subject.subscribe((elem) => {
      this.toggle = elem
    })
    this.UserId = this._storageService.getLocalData('user_id')

    this.role = this._storageService.getLocalData('role')
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || ''
    this.GetNotificationCountsByUserid()
    this.GetUserProfileImage()
  }

  toggleNav() {
    this.toggle = !this.toggle
    this._headerService.subject.next(this.toggle)
  }

  logout() {
    this.showLoader = true
    let email = localStorage.getItem('userEmail') || ''

    if (email !== '') {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('token_operator')
      localStorage.removeItem('role')
      localStorage.removeItem('token_refresh')
      localStorage.removeItem('token_id')
      localStorage.removeItem('token_expires_on')
      localStorage.removeItem('refreshToken_expires_on')
      localStorage.removeItem('handleErrorCalled')
      localStorage.removeItem('resetToken')
      localStorage.removeItem('userEmailVerify')
      localStorage.removeItem('timeInterval')
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      localStorage.removeItem('emailEleVehi')
      localStorage.removeItem('passEleVehi')
      this._loginService.logout(email).subscribe({
        next: (response: any) => {
          this._router.navigate(['/login'])
        },
        error: (err) => {
          this.showLoader = false
          this._router.navigate(['/login'])
          // this.toastr.error('Something Went Wrong', 'Please Try Again')
        },
      })
    }
  }

  GetNotificationCountsByUserid() {
    const body = {
      userId: this.UserId,
    }
    this._headerService
      .GetNotificationCountsByUserid(body)
      .subscribe((res: any) => {
        this.countByUserId = res.counts
      })
  }

  /**
   * Get User Profile Picture
   */
  GetUserProfileImage() {
    this._UserProfileService.GetUserProfileImage().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.profileImg = 'data:image/jpeg;base64,' + res.data
      }
    })
  }
}
