import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DevExpress from 'devextreme';
import LoadOptions = DevExpress.data.LoadOptions;

@Injectable({
  providedIn: 'root'
})
export class DataSourceFactoryService {
  constructor(private http: HttpClient) {
    //store.OnAddEvent = new EventEmitter<number>();
  }

  createStore<TData>(idField: string, backUrl: string) {
    return new TFMCustomStore<TData>(this.http, idField, backUrl);

    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // let backUrl = 'http://192.168.0.52:5059/FakeData/';
    // const isNotEmpty = (value) => value !== undefined && value !== null && value !== '';
    // let store = new CustomStore({
    //   key: 'id',
    //   load: (loadOptions) => {
    //     let params: HttpParams = new HttpParams();
    //
    //     [
    //       'filter',
    //       'group',
    //       'groupSummary',
    //       'parentIds',
    //       'requireGroupCount',
    //       'requireTotalCount',
    //       'searchExpr',
    //       'searchOperation',
    //       'searchValue',
    //       'select',
    //       'sort',
    //       'skip',
    //       'take',
    //       'totalSummary',
    //       'userData'
    //     ].forEach(function (i) {
    //       if (i in loadOptions && isNotEmpty(loadOptions[i])) {
    //         params = params.set(i, JSON.stringify(loadOptions[i]));
    //       }
    //     });
    //
    //     return this.http.get<any>(backUrl, {params: params})
    //       .toPromise()
    //       .then(response => {
    //         return {
    //           data: response.data,
    //           totalCount: response.totalCount,
    //           summary: response.summary,
    //           groupCount: response.groupCount
    //         };
    //       })
    //       .catch(() => {
    //         throw 'Data loading error'
    //       });
    //   },
    //   insert: values => {
    //     return this.http.post(backUrl, JSON.stringify(values), {headers: headers})
    //       .toPromise()
    //       .catch(() => {
    //         throw 'Insertion failed'
    //       });
    //   },
    //   remove: key => {
    //     return this.http.delete(backUrl + encodeURIComponent(key))
    //       .toPromise().then<void>()
    //       .catch(() => {
    //         throw 'Deletion failed'
    //       });
    //   },
    //   update: (key, values) => {
    //     return this.http.patch(backUrl + encodeURIComponent(key), JSON.stringify(values), {headers: headers})
    //       .toPromise()
    //       .catch(() => {
    //         throw 'Update failed'
    //       });
    //   }
    // });
    //
    // return store;
  }
}

export class TFMCustomStore<TData> extends CustomStore {
  public OnAddEvent: EventEmitter<number>;

  constructor(private http: HttpClient, private idField: string, private backUrl: string) {
    super({
      key: idField,
      load: async (loadOptions) => {
        let params: HttpParams = new HttpParams();

        const fields = [
          'filter',
          'group',
          'groupSummary',
          'parentIds',
          'requireGroupCount',
          'requireTotalCount',
          'searchExpr',
          'searchOperation',
          'searchValue',
          'select',
          'sort',
          'skip',
          'take',
          'totalSummary',
          'userData'
        ];

        fields.forEach(function(i) {
          const option = loadOptions[i as keyof LoadOptions<any>];
          if (i in loadOptions && isNotEmpty(option)) {
            params = params.set(i, JSON.stringify(option));
          }
        });

        try {
          const response = await this.http.get<any>(this.backUrl, {params: params})
            .toPromise();
          return {
            data: response.data,
            totalCount: response.totalCount,
            summary: response.summary,
            groupCount: response.groupCount
          };
        } catch {
          throw 'Data loading error';
        }
      },
      byKey: (key) => this.byKey(key)
    });

    const isNotEmpty = (value: string) => value !== undefined && value !== null && value !== '';

    this.OnAddEvent = new EventEmitter<number>();
  }

  byKey(key: number): Promise<TData> {
    return this.http.get<TData>(this.backUrl + key)
      .toPromise();
  }
}
