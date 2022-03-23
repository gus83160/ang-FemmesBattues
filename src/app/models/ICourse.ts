// import { Moment } from 'moment';

export interface ICourse {
  id: number;

  co_date: Date;
  co_heuredebut?: Date | string;
  co_heurefin?: Date | string;

  co_typeCourse: number;
  co_kmsA: number;
  co_kmsB: number;
  co_kmsC: number;
  co_kmsD: number;
  co_peage: number;
  co_appForf: boolean;

  co_attjour?: Date | string;
  co_attnuit?: Date | string;
}
