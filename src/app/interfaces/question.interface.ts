import { NameIdEntity } from "./name-id-entity.interface";

export interface Question {
  main: string;
  muscleId: string;
  questionKey: string;
  answers: NameIdEntity[];
}
