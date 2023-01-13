import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class SProyectoService {

  expURL = environment.URL+'proyectos/';

  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.expURL + 'lista');
  }

  public detail(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.expURL + `detail/${id}`);
  }

  public save(experiencia: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'create', experiencia);
  }

  public update(id: number, experiencia: Proyecto) : Observable<any> {
    return this.httpClient.put<any>(this.expURL+ `update/${id}`, experiencia);
  }

  public delete(id: number) : Observable<any> {
    return this.httpClient.delete<any>(this.expURL+`delete/${id}`);
  }
}
