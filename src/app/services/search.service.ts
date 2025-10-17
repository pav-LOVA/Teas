import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  get currentSearch(): string {
    return this.searchSubject.value;
  }

  setSearch(value: string): void {
    const normalized = value.trim();
    this.searchSubject.next(normalized);
  }

  clearSearch(): void {
    this.searchSubject.next('');
  }
}
