import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/screen/login/login.service'
import { HeaderService } from './header.service'
import { StorageService } from 'src/app/service/storage.service'
import { UserProfileService } from 'src/app/screen/user-profile/user-profile.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // DECLARE VARIABLES
  toggle: boolean = false
  showLoader = false
  username: string | null | undefined
  UserId: string | null
  countByUserId: any
  role: string | null
  profileImg: any
  imageSubscription: any
  notificationSubscription: any
  isAdmin: boolean = false;

  constructor(
    public _headerService: HeaderService,
    public _router: Router,
    public _loginService: LoginService,
    private _storageService: StorageService,
    private _UserProfileService: UserProfileService,
  ) {
    /**
     * SUBJECT CALL ON TOGGLE NAVIGATION
     */
    this._headerService.subject.subscribe((elem) => {
      this.toggle = elem
    })
    this.UserId = this._storageService.getLocalData('user_id')

    this.role = this._storageService.getLocalData('role')
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || ''
    this.GetUserProfileImage()
    if (this.role == 'Operator') {
      this.GetNotificationCountsByUserid()
    }
    
    this.isAdmin = this.role === 'Admin'; 
    
    /**
     * SUBJECT CALL ON IMAGE UPLOAD
     */
    this.imageSubscription = this._UserProfileService.profileSubject.subscribe(
      (res: any) => {
        if (res) {
          this.GetUserProfileImage()
        }
      },
    )

    // SUBJECT CALL ON NOTICATION IS READ

    this.notificationSubscription = this._UserProfileService.alertSubject.subscribe(
      (res) => {
        this.GetNotificationCountsByUserid()
      },
    )
  }
  //TOGGLE NAVIGATION

  toggleNav() {
    this.toggle = !this.toggle
    this._headerService.subject.next(this.toggle)
  }
  /**
   * LOGOUT
   */

  logout() {
    this.showLoader = true
    let email = localStorage.getItem('userEmail') || ''

    if (email !== '') {
      this._storageService.clearAll()
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

  //NOTIFICATION COUNT

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

  //GET USER PROFILE

  GetUserProfileImage() {
    this._UserProfileService.GetUserProfileImage().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.profileImg = 'data:image/jpeg;base64,' + res.data
      }
    })
  }

  //SUBSCRIPTION CLEAN UP

  ngOnDestroy() {
    this.imageSubscription.unsubscribe()
    this.notificationSubscription.unsubscribe()
  }
}
