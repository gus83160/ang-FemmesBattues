import {DatePipe} from '@angular/common';
import {NativeDateAdapter} from '@angular/material/core';

// https://medium.com/@kristinahertmann/multi-language-date-formats-with-angular-material-b8598415d117
// https://stackblitz.com/edit/multi-lang-dateformat?file=src%2Fapp%2Fshared%2Fdate-adapter.ts

export interface DateDisplay {
  year: string;
  month: string;
  day: string;
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    //dateInput: { month: 'short', year: 'numeric', day: 'numeric'},
    dateInput: 'customInput',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

export class CustomDateAdapter extends NativeDateAdapter {
  parse(value: string | number): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str: string[] = value.split('/');
      if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
        return null;
      }

      let year = Number(str[2]);
      if (year < 100) { year += 2000; }
      const month = Number(str[1]);
      const day = Number(str[0]);

      const newDt = new Date(year, month - 1, day);

      // Teste si la date saisie est bien une date valide
      // javascript, comme par magie, autorise la création d'une date avec comme valeur 32/13/2022
      if (newDt.getFullYear() == year && newDt.getMonth() == month - 1 && newDt.getDate() == day) {
        return newDt;
      } else {
        return null;
      }
    }
    const timestamp: number = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, display: string | DateDisplay): string {
    let res;
    if (display === 'customInput') {
      res = new DatePipe(this.locale).transform(date, 'shortDate');
    } else {
      res =  new DatePipe(this.locale).transform(date, 'dd/MM/yyyy');
    }
    return res;
  }
}

// import {NativeDateAdapter} from '@angular/material/core';
//
// export class CustomDateAdapter extends NativeDateAdapter {
//   parse(value: any): Date | null {
//     const currentDate = new Date();
//     let year: number = currentDate.getFullYear();
//     let month: number = currentDate.getMonth();
//     let day: number = currentDate.getDate();
//
//     if ((typeof value === 'string') &&
//       ((value.indexOf('/') > -1) || (value.indexOf('.') > -1)  || (value.indexOf('-') > -1))) {
//
//       const str = value.split(/[\./-]/);
//
//       day = !!str[0] ? +str[0] : day;
//       month = !!str[1] ? +str[1] - 1 : month;
//       year = !!str[2] ?
//         // If year is less than 3 digit long, we add 2000.
//         +str[2].length <= 3 ? +str[2] + 2000 : +str[2] : year ;
//
//       return new Date(year, month, day);
//     } else {
//       return null;
//     }
//   }
// }
