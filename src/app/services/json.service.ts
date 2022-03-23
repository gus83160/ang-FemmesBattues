import { Injectable } from '@angular/core';

// Gère le fait que les dates sérialisé en JSON et ensuite désérialisé sont désérialisé en tant que chaine

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;
  constructor() {
  }

  stringify(o: any): string {
    return JSON.stringify(o);
  }

  parse(s: string): any {
    return JSON.parse(s, this.parseIsoDateStrToDate());
  }

  parseIsoDateStrToDate = () => (key: any, value: string | number | Date) => {
    if (typeof value === "string" && this.isoDateFormat.test(value)){
      return new Date(value);
    }
    return value
  }
}
