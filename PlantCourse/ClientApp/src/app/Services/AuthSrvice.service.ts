import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponce';
import { SignIn } from '../Models/SignIn';
import { SignUp } from '../Models/SignUp';
import jwt_decode from "jwt-decode";
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthSrviceService {

constructor(private http:HttpClient,private router:Router) { }
statusLogin=new EventEmitter<boolean>();
//UserInfo=new EventEmitter<User>();
public UserInfo="";
//public UserInfo:User;
baseUrl = "/api/Account";

SignUp(model: SignUp): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.baseUrl + '/register', model);
}
setUser(model:string){
  //this.UserInfo.emit(model);
 // this.UserInfo=localStorage.getItem('user');
 //localStorage.setItem('user',model);
 var Info=localStorage.getItem('user');
  console.log(Info);
}
getUser(model:string):Observable<User>{
  console.log("LOGIN")
  return this.http.get<User>("/api/Plant/GetUser?name="+model);
}
SignIn(model: SignIn): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.baseUrl + '/login', model);
}
isLoggetIn(){
    var token=localStorage.getItem('token');
    console.log(token);
    if(token!=null){
      return true;
    }
    else return false;
}

isAdmin(){
if(this.isLoggetIn()){
  var token=localStorage.getItem('token');
  var dataToken=jwt_decode(token);
  if(dataToken.roles==="Admin"){
    return true;
  }
  else return false;
}
else{
  return false;
}
}

LogOut() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
  this.statusLogin.emit(false);
}
}
