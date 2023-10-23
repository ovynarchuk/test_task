import { Person } from "./Person";

export interface Table {
  count: number,
  next: string | null,
  previous: string | null,
  results: Person[]
}