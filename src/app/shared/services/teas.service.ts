import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TeaType} from "../../../types/tea.type";


@Injectable({
  providedIn: 'root'
})
export class TeasService {

  private readonly baseUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getTeas(search?: string): Observable<TeaType[]> {
    let url = this.baseUrl;

    if (search) {
      const normalized = search.trim().toLowerCase();
      const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);

      url = `${this.baseUrl}?search=${encodeURIComponent(capitalized)}`;
    }

    return this.http.get<TeaType[]>(url);
  }

  getTea(id: number): Observable<TeaType> {
    return this.http.get<TeaType>(`${this.baseUrl}?id=${id}`);
  }
}
