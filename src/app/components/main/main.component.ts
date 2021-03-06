import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
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
  public validIndex!: number | null;
  public submitted: boolean = false;
  public steps: any[];
  public questionIndex: number = 0;
  @ViewChild(MatStepper) stepper!: MatStepper;

  public get isSuccess(): boolean {
    return this.validIndex === this.curAnswerIndex;
  }

  constructor(public appService: AppService, private router: Router) {
    this.steps = [
      {
        label: "Секция",
        control: new FormControl(""),
      },
      {
        label: "От",
        control: new FormControl(""),
      },
      {
        label: "К",
        control: new FormControl(""),
      },
      {
        label: "Функция",
        control: new FormControl(""),
      },
      {
        label: "Иннервация",
        control: new FormControl(""),
      },
      {
        label: "Кровь",
        control: new FormControl(""),
      },
    ];
  }

  public submit(question: Question): void {
    this.submitted = !this.submitted;
    if (this.submitted) {
      this.submitText = "Дальше";
      this.validIndex = this.appService.validate(question);
      if (this.isSuccess) {
        this.appService.correctAnswers++;
      } else {
        this.stepper.selected?.stepControl.setErrors({ required: true });
      }
    } else {
      this.nextStep();
    }
  }

  private nextStep(): void {
    this.submitText = "Ответить";
    this.curAnswerIndex = null;
    this.validIndex = null;
    this.questionIndex++;
    if (this.stepper.selectedIndex === this.steps.length - 1) {
      this.stepper.selectedIndex = 0;
      if (this.appService.isEnd) {
        this.router.navigateByUrl("/results");
        return;
      }
      this.appService.curMuscle++;
      this.steps.forEach((step) => step.control.reset());
      this.stepper.reset();
    } else {
      this.stepper.next();
    }
  }
}
