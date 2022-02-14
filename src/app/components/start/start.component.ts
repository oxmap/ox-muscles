import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent {
  public val: number = 15;

  constructor(private router: Router, private appService: AppService) {}

  public start(): void {
    this.appService.changeCount(this.val);
    this.router.navigateByUrl("/main");
  }
}
