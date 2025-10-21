import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import {TeaType} from "../../../../types/tea.type";
import {TeasService} from "../../../shared/services/teas.service";
import {SearchService} from "../../../shared/services/search.service";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  selectedImage: string | null = null;
  public teas: TeaType[] = [];
  public loading = false;
  public notFound = false;
  public title = 'Наши чайные коллекции';

  private subscription?: Subscription;

  constructor(
    private teasService: TeasService,
    private router: Router,
    private searchService: SearchService
  ) {}

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.selectedImage = null;
  }

  ngOnInit(): void {
    this.subscription = this.searchService.search$.subscribe(searchValue => {
      this.title = searchValue
        ? `Результаты поиска по запросу "${searchValue}"`
        : 'Наши чайные коллекции';

      this.loadTeas(searchValue);
    });

    this.loadTeas(this.searchService.currentSearch);
  }

  private loadTeas(search?: string): void {
    this.loading = true;
    this.notFound = false;

    this.teasService.getTeas(search)
      .pipe(
        tap(() => (this.loading = false))
      )
      .subscribe({
        next: (data) => {
          this.teas = data;
          this.notFound = data.length === 0;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
