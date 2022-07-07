import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoginModule } from './screen/login/login.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './service/interceptor/token-interceptor.service'
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule, ToastrModule.forRoot({timeOut: 5000,positionClass: 'toast-top-right'
  }),HttpClientModule,
    LoginModule,
  ],

  providers: [{provide: HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
