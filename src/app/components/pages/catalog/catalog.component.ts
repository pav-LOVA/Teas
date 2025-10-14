import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeasService} from "../../../services/teas.service";
import {Subscription, tap} from "rxjs";
import {TeaType} from "../../../types/tea.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  selectedImage: string | null = null;

  public teas: TeaType[] = [];
  private subscription: Subscription | null = null;
  loading: boolean = false;

  constructor(private teasService: TeasService, private router: Router) {
  }

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.selectedImage = null;
  }

  ngOnInit(): void {
    this.loading = true;
    this.teasService.getTeas().pipe(
      tap(() => {
        this.loading = false;
      })
    )
      .subscribe(
        {
          next: (data) => {
            this.teas = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
