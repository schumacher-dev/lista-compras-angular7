import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SequelizeModule {
  model: string;
  attributes?: string;
  through?: any;
  as: string;
  required?: boolean;
}

interface SequelizeParams {
  where: any;
  set?: any;
  attributes?: string[]
  include?: Array<SequelizeModule>
}

interface APIQueryParams {
  params: SequelizeParams;
  options?: any
  method?: string;
  model?: string;
}

interface APICreateParams {
  data: any;
  options?: any;
  method?: string;
  model?: string;
}

interface APIUpdateParams {
  params: SequelizeParams;
  options?: any;
  method?: string;
  model?: string;
}

interface APIMainManifest {
  async?: boolean;
  manifest: Array<APIQueryParams | APICreateParams | APIUpdateParams>
}

const HOST = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private http: HttpClient
  ) { }

  update(model: string, data: APIUpdateParams): Observable<any> {
    console.log(data);
    return this.http.post(`${HOST}/${model}/update`, data, {});
  }

  delete(model: string, data: APIUpdateParams): Observable<any> {
    return this.http.post(`${HOST}/${model}/delete`, data, {});
  }

  create(model: string, data: APICreateParams): Observable<any> {
    return this.http.post(`${HOST}/${model}/create`, data, {});
  }

  findAll(model: string, params: APIQueryParams): Observable<any> {
    return this.http.post(`${HOST}/${model}/findAll`, params, {});
  }

  findOne(model: string, params: APIQueryParams): Observable<any> {
    return this.http.post(`${HOST}/${model}/findOne`, params, {});
  }

  main(params: APIMainManifest): Observable<any> {
    return this.http.post(`${HOST}/main`, params, {});
  }

  transaction(transactionName: string, params?: any): Observable<any> {
    return this.http.post(`${HOST}/transaction/${transactionName}`, params, {});
  }
}
