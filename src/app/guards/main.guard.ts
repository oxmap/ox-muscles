import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable({
  providedIn: "root",
})
export class MainGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot): boolean {
    if (this.appService.questions.length === 0) {
      this.router.navigateByUrl("/start");
      return false;
    }
    return true;
  }
}
