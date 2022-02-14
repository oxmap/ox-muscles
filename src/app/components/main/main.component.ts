import { Component, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  constructor(public appService: AppService) {}
}
