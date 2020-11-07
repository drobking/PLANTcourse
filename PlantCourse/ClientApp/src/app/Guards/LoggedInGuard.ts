import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Observable } from "rxjs";
import { AuthSrviceService } from "../Services/AuthSrvice.service";
@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(
        private authService:AuthSrviceService,
        private router:Router,
        private notifier:NotifierService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check(state.url);
    }

    check(url: string): boolean {
      if(this.authService.isLoggetIn()){
          return true;

      }
      else{
          this.router.navigate(['/']);
          this.notifier.notify('error','You dont login');
          return false;
      }
    }
}
