import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9\s\-\/]+$/)]],
    zip: ['', [Validators.required]],
    product: [{ value: '', disabled: true }, [Validators.required]],
    price: [{ value: 0, disabled: true }],
    comment: ['']
  });

  private subscription: Subscription | null = null;
  private orderSub: Subscription | null = null;
  public orderSuccess = false;
  public orderError = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParamMap.subscribe(params => {
      const productParam = params.get('product');
      const priceParam = params.get('price');

      this.checkoutForm.patchValue({
        product: productParam || '',
        price: priceParam ? Number(priceParam) : 0
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.orderSub?.unsubscribe();
  }

  public createOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formData = this.checkoutForm.getRawValue(); // включая disabled

    const payload = {
      name: formData.name!,
      last_name: formData.lastName!,
      phone: formData.phone!,
      country: formData.country!,
      zip: Number(formData.zip),
      address: formData.address!,
      product: formData.product!,
      comment: formData.comment || '',
    };

    this.orderSub = this.orderService.createOrder(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.orderSuccess = true;
          console.log(response.success);
        } else {
          this.orderError = true;
        }
      },
      error: () => {
        this.orderError = true;
      }
    });
  }
}

// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Subscription} from "rxjs";
// import {FormValuesType} from "../../../types/form-values.type";
// import {ActivatedRoute, Router} from "@angular/router";
// import {OrderService} from "../../../services/order.service";
// import {FormBuilder, Validators} from "@angular/forms";
//
// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.scss']
// })
// export class OrderComponent implements OnInit, OnDestroy {
//
//   // public formValues: FormValuesType = {
//   //   name: '',
//   //   last_name: '',
//   //   phone: '',
//   //   country: '',
//   //   zip: 999,
//   //   product: '',
//   //   price: 0,
//   //   address: '',
//   //   comment: '',
//   // }
//
//   checkoutForm = this.fb.group({
//     name: ['', [Validators.required]],
//     lastName: ['', [Validators.required]],
//     phone: ['', Validators.required],
//     country: ['', [Validators.required]],
//     zip: [0, [Validators.required]],
//     product: ['', [Validators.required]],
//     price: [0],
//     comment: [''],
//   })
//
//   private subscription: Subscription | null = null;
//   private subscriptionOrder: Subscription | null = null;
//
//   constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder) {
//   }
//
//   ngOnInit(): void {
//     // const productParam = this.activatedRoute.snapshot.queryParamMap.get('product');
//     // const priceParam = this.activatedRoute.snapshot.queryParamMap.get('price');
//     // if (productParam) {
//     //   this.formValues.product = productParam;
//     // }
//     // if (priceParam) {
//     //   this.formValues.price = Number(priceParam);
//     // }
//
//     this.subscription = this.activatedRoute.queryParamMap.subscribe(params => {
//       const productParam = params.get('product');
//       const priceParam = params.get('price');
//
//       this.checkoutForm.patchValue({
//         product: productParam || '',
//         price: priceParam ? Number(priceParam) : '',
//       });
//     });
//   }
//
//   ngOnDestroy(): void {
//     this.subscription?.unsubscribe();
//     this.subscriptionOrder?.unsubscribe();
//   }
//
//   // get paymentName() {return this.checkoutForm.controls['payment']?.get('card')?.get('name');};
//   // get paymentNumber() {return this.checkoutForm.controls['payment']?.get('card')?.get('number');};
//   // get paymentExpiration() {return this.checkoutForm.controls['payment']?.get('card')?.get('expiration');};
//   // get paymentCVV() {return this.checkoutForm.controls['payment']?.get('card')?.get('cvv');};
//
//
//   public createOrder() {
//     if (!this.formValues.name) {
//       alert("Пожалуйста, введите Ваше имя");
//       return;
//     }
//     if (!this.formValues.last_name) {
//       alert("Пожалуйста, введите Вашу фамилию");
//       return;
//     }
//     if (!this.formValues.phone) {
//       alert("Пожалуйста, введите Ваш номер телефона");
//       return;
//     }
//     if (!this.formValues.country) {
//       alert("Пожалуйста, введите Вашу страну проживания");
//       return;
//     }
//     if (!this.formValues.zip) {
//       alert("Пожалуйста, введите Ваш индекс");
//       return;
//     }
//     if (!this.formValues.product) {
//       alert("Пожалуйста, введите Выбранный продукт");
//       return;
//     }
//     if (!this.formValues.address) {
//       alert("Пожалуйста, введите Ваш адрес");
//       return;
//     }
//
//     this.subscriptionOrder = this.orderService.createOrder({
//       name: this.formValues.name,
//       last_name: this.formValues.last_name,
//       phone: this.formValues.phone,
//       country: this.formValues.country,
//       zip: this.formValues.zip,
//       product: this.formValues.product,
//       address: this.formValues.address,
//     })
//       .subscribe(response => {
//
//           if (response.success && !response.message) {
//             alert('Спасибо за заказ (:');
//             // console.log(response.success);
//             this.formValues = {
//               name: '',
//               last_name: '',
//               phone: '',
//               country: '',
//               zip: 999,
//               product: '',
//               price: 0,
//               address: '',
//               comment: '',
//             }
//           } else {
//             alert('Ошибка :(');
//           }
//         }
//       )
//   }
// }
