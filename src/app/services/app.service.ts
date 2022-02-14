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
  public current = 1;
  public questions: Question[] = [];
  private data: Muscle[];

  constructor() {
    this.data = this.shuffleArray(data);
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
        let answers = [(muscle as any)[key]];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * this.data.length);
          answers.push((this.data as any)[randomIndex][key]);
        }

        return {
          main: muscle.name,
          questionKey: key,
          answers: this.shuffleArray(answers),
        };
      });
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
