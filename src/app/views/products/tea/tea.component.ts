import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeaType} from "../../../../types/tea.type";
import {TeasService} from "../../../shared/services/teas.service";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-tea',
  templateUrl: './tea.component.html',
  styleUrls: ['./tea.component.scss']
})
export class TeaComponent implements OnInit {

  public tea: TeaType = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: '',
  };

  constructor(private activatedRoute: ActivatedRoute, private teasService: TeasService, private router: Router, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.teasService.getTea(+params['id'])
          .subscribe(
            {
              next: (data) => {
                this.tea = data;
              },
              error: (error) => {
                console.log(error);
                this.router.navigate(['/']);
              }
            }
          )
      }
    })
  }
}
