import { Lesson } from "./lesson";

export interface Main {
  _id: string;
  name: string;
  categoria: string;
  lessons?: Lesson[];
}
