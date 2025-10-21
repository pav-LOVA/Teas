import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
    private orderService: OrderService,
    private router: Router,
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

    const formData = this.checkoutForm.getRawValue();

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
          setTimeout (() => this.router.navigate(['/']), 10000);
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
