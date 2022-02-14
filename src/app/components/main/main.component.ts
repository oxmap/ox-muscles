import { Component, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { Question } from "src/app/interfaces/question.interface";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  public curAnswerIndex: number | null = null;
  public submitText: string = "Ответить";
  public isSuccess!: boolean;
  public submitted: boolean = false;
  public steps: any[];
  public questionIndex: number = 0;
  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(public appService: AppService, private router: Router) {
    this.steps = [
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
      this.isSuccess = this.appService.validate(this.curAnswerIndex, question);
      if (this.isSuccess) {
        this.appService.correctAnswers++;
      }
    } else {
      this.submitText = "Ответить";
      this.curAnswerIndex = null;
      this.questionIndex++;
      if (this.stepper.selectedIndex === this.steps.length - 1) {
        this.stepper.selectedIndex = 0;
        if (this.appService.isEnd) {
          this.router.navigateByUrl("/results");
          return;
        }
        this.appService.curMuscle++;
      } else {
        this.stepper.next();
      }
    }
  }
}
