import { Component, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { Question } from "src/app/interfaces/question.interface";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  public curIndex: number | null = null;
  public submitText: string = "Ответить";
  public isSuccess!: boolean;
  public submitted: boolean = false;
  public steps: any[];
  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(public appService: AppService) {
    this.steps = [
      {
        label: "Часть тела",
      },
      {
        label: "Секция",
      },
      {
        label: "От",
      },
      {
        label: "К",
      },
      {
        label: "Функция",
      },
      {
        label: "Иннервация",
      },
      {
        label: "Кровь",
      },
    ];
  }

  public submit(question: Question): void {
    this.submitted = !this.submitted;
    if (this.submitted) {
      this.submitText = "Дальше";
      this.isSuccess = this.appService.validate(this.curIndex, question);
    } else {
      this.submitText = "Ответить";
      this.curIndex = null;
      this.stepper.next();
    }
  }
}
