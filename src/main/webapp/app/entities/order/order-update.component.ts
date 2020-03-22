import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment/payment.service';

type SelectableEntity = IRestaurant | IUser | IPayment;

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  users: IUser[] = [];
  payments: IPayment[] = [];

  editForm = this.fb.group({
    id: [],
    orderState: [null, [Validators.required]],
    deliveryTime: [null, [Validators.required]],
    restaurant: [],
    user: [],
    payment: [null, Validators.required]
  });

  constructor(
    protected orderService: OrderService,
    protected restaurantService: RestaurantService,
    protected userService: UserService,
    protected paymentService: PaymentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      if (!order.id) {
        const today = moment().startOf('day');
        order.deliveryTime = today;
      }

      this.updateForm(order);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.paymentService.query().subscribe((res: HttpResponse<IPayment[]>) => (this.payments = res.body || []));
    });
  }

  updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      orderState: order.orderState,
      deliveryTime: order.deliveryTime ? order.deliveryTime.format(DATE_TIME_FORMAT) : null,
      restaurant: order.restaurant,
      user: order.user,
      payment: order.payment
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id'])!.value,
      orderState: this.editForm.get(['orderState'])!.value,
      deliveryTime: this.editForm.get(['deliveryTime'])!.value
        ? moment(this.editForm.get(['deliveryTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      restaurant: this.editForm.get(['restaurant'])!.value,
      user: this.editForm.get(['user'])!.value,
      payment: this.editForm.get(['payment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
