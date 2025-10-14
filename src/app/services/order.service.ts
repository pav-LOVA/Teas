import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // title: string = '';
  // price: number = 0;

  constructor(private http: HttpClient) {
  }

  createOrder(data: {
    name: string;
    last_name: string;
    phone: string;
    country: string;
    zip: number;
    address: string;
    product: string;
    comment?: string;
  }) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.ru/order-tea`, data)
  }

}

