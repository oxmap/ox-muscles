import { Injectable } from "@angular/core";
import { Muscle } from "../interfaces/muscle.interface";
import data from "src/assets/data.json";
import { Question } from "../interfaces/question.interface";

/**
 * Сервис для аутентификации
 */
@Injectable({
  providedIn: "root",
})
export class AppService {
  public count = 15;
  public current = 0;
  public questions: Question[] = [];
  private data: Muscle[];

  private bodies: string[];
  private sections: string[];
  constructor() {
    this.data = this.shuffleArray(data);
    this.bodies = this.data
      .map((el) => el.body)
      .filter((v, i, a) => a.indexOf(v) === i);
    this.sections = this.data
      .map((el) => el.section)
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  public validate(answerIndex: number | null, question: Question): boolean {
    if (answerIndex === null) {
      return false;
    }
    return (
      (this.data.find((el) => el.id === question.muscleId) as any)[
        question.questionKey
      ] === question.answers[answerIndex]
    );
  }

  public changeCount(val: number): void {
    this.count = val;
    this.questions = this.generateQuestions();
  }

  private generateQuestions(): Question[] {
    const randomMuscles = this.data.slice(0, this.count);

    return randomMuscles.reduce((prev: any, cur: Muscle) => {
      const questionRow = this.getQuestionRow(cur);
      return [...prev, ...questionRow];
    }, []);
  }

  private getQuestionRow(muscle: Muscle): Question[] {
    return Object.keys(muscle)
      .filter((key) => !["name", "id"].includes(key))
      .map((key) => {
        const answers = this.getRandomAnswer(muscle, key);
        console.log(answers);
        const res = {
          main: muscle.name,
          muscleId: muscle.id,
          questionKey: key,
          answers,
        };
        return res;
      });
  }

  private getRandomAnswer(muscle: Muscle, key: string): string[] {
    let answers = [(muscle as any)[key]];
    const array =
      key === "body"
        ? [...this.bodies]
        : key === "section"
        ? [...this.sections]
        : [...this.data];
    if (key !== "body" && key !== "section") {
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        answers.push((this.data as any)[randomIndex][key]);
      }
      return this.shuffleArray(answers);
    } else {
      return [...answers, ...this.shuffleArray(array).slice(0, 3)];
    }
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
