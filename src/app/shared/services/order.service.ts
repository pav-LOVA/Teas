import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderDataType} from "../../../types/order-data.type";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // title: string = '';
  // price: number = 0;

  constructor(private http: HttpClient) {
  }

  createOrder(data: OrderDataType) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.ru/order-tea`, data)
  }

}

