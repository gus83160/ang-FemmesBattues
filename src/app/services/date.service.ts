import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getLundi(dt: Date) : Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    let weekday = dt.getDay();
    if (weekday === 0) {
      weekday = 6;
    } else {
      weekday--;
    }
    res.setDate(dt.getDate() - weekday);
    return res;
  }

  getDimanche(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    res.setDate(res.getDate() + 7);
    res = this.getLundi(res);
    res.setDate(res.getDate() - 1);
    res = this.getEndOfDay(res);
    return res;
  }

  getDebutMois(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), 1);
    return res;
  }

  getFinMois(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth() + 1, 1);
    res.setDate(res.getDate() - 1);
    res = this.getEndOfDay(res);
    return res;
  }

  getDebutAnnee(dt: Date): Date {
    let res = new Date(dt.getFullYear(), 0, 1);
    return res;
  }

  getFinAnnee(dt: Date): Date {
    let res = new Date(dt.getFullYear(), 11, 31);
    res = this.getEndOfDay(res);
    return res;
  }

  getEndOfDay(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    res.setDate(dt.getDate() + 1);
    res.setTime(res.getTime() - 1);
    return res;
  }
}
