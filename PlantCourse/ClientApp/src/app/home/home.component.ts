import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignIn } from '../Models/SignIn';
import { AuthSrviceService } from '../Services/AuthSrvice.service';
import jwt_decode from "jwt-decode";
import { SignUp } from '../Models/SignUp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private authService: AuthSrviceService,
    private router: Router){}
    model = new SignIn();
    modelReg = new SignUp();
    confirmPassword: string;
    submitForm() {
      console.log("Show");
    this.spinner.show();
    if (!this.model.isValid()) {
      console.log("hide1");
      this.spinner.hide();
      this.notifier.notify('error', 'Please, enter all fields');
    }
    else if (!this.model.isEmail()) {
      this.spinner.hide();
      console.log("hide2");
      this.notifier.notify('error', 'Please, enter correct email');
    }
    else {
      console.log("hide3");
      this.authService.SignIn(this.model).subscribe(
        
        data => { console.log("hide3");
          if (data.status === 200) {
            console.log("hide3");
            localStorage.setItem('token', data.token);
            var decode = jwt_decode(data.token);
            if (decode.roles === "Admin") {
              console.log("hide3");
              this.router.navigate(['/admin-panel'])
            }
            else if (decode.roles === "User") {
              console.log("hide3");
              this.router.navigate(['/fetch-data'])
            }
            this.authService.statusLogin.emit(true);
          }
          else {
            console.log("hide3");
            for (var i = 0; i < data.errors.length; i++) {
              console.log("awdadawd");
              this.notifier.notify('error', data.errors[i])
            }
          }
          console.log("hide3");
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      )

    }
  }
    Register() {
      this.spinner.show();
      if (!this.modelReg.isValid()) {
        this.spinner.hide();
        this.notifier.notify('error', 'Please, enter all fields');
      }
      else if (!this.modelReg.isEmail()) {
        this.spinner.hide();
        this.notifier.notify('error', 'Please, enter correct email');
      }
      else if (this.modelReg.Password != this.confirmPassword) {
        this.spinner.hide();
        this.notifier.notify('error', 'Password don\'t match');
      }
      else {
        this.authService.SignUp(this.modelReg).subscribe(
          data => {
            if (data.status === 200) {
              this.notifier.notify('success', 'You success registered in system!');
              this.router.navigate(['/sign-in']);
            }
            else {
              for (var i = 0; i < data.errors.length; i++) {
                this.notifier.notify('error', data.errors[i])
              }
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
        )
  
      }
    }
  
 ngOnInit(){}
}
