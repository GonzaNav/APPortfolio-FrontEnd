import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hys } from '../model/hys';

@Injectable({
  providedIn: 'root'
})
export class HysService {
  URL = environment.URL+"hys/";
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Hys[]> {
    return this.httpClient.get<Hys[]>(this.URL + 'lista');
  }

  public listaBlandas(): Observable<Hys[]> {
    return this.httpClient.get<Hys[]>(this.URL + 'lista/soft');
  }

  public listaFuertes(): Observable<Hys[]> {
    return this.httpClient.get<Hys[]>(this.URL + 'lista/hard');
  }

  public detail(id: number): Observable<Hys> {
    return this.httpClient.get<Hys>(this.URL + `detail/${id}`);
  }

  public save(Hys: Hys): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'create', Hys);
  }

  public update(id: number, Hys: Hys) : Observable<any> {
    return this.httpClient.put<any>(this.URL+ `update/${id}`, Hys);
  }

  public delete(id: number) : Observable<any> {
    return this.httpClient.delete<any>(this.URL+`delete/${id}`);
  }
}
