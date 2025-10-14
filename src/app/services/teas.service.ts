import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TeaType} from "../types/tea.type";

@Injectable({
  providedIn: 'root'
})
export class TeasService {

  constructor(private http: HttpClient) { }

  getTeas():Observable<TeaType[]> {
    return this.http.get<TeaType[]>('https://testologia.ru/tea');
  }

  getTea(id: number): Observable<TeaType> {
    return this.http.get<TeaType>(`https://testologia.ru/tea?id=${id}`);
  }
}
