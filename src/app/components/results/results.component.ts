import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent {
  public percent: number;
  constructor(public appService: AppService) {
    this.percent = Math.floor(
      (this.appService.correctAnswers / this.appService.questions.length) * 100
    );
  }
}
