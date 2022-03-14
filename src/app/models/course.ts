// import { Moment } from 'moment';

export class Course {
  id: number = 0;

  co_date: Date = null;
  co_heuredebut: Date | string = null;
  co_heurefin: Date | string = null;

  co_typeCourse: number | null = null;
  co_kmsA: number = 0;
  co_kmsB: number = 0;
  co_kmsC: number = 0;
  co_kmsD: number = 0;
  co_peage: number = 0;
  co_appForf: boolean = false;

  co_attjour: Date | string = null;
  co_attnuit: Date | string = null;
}
