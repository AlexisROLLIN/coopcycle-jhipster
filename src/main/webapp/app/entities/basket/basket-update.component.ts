import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from 'app/entities/order/order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IOrder | IUser;

@Component({
  selector: 'jhi-basket-update',
  templateUrl: './basket-update.component.html'
})
export class BasketUpdateComponent implements OnInit {
  isSaving = false;
  orders: IOrder[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    basketState: [null, [Validators.required]],
    order: [],
    user: []
  });

  constructor(
    protected basketService: BasketService,
    protected orderService: OrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => {
      this.updateForm(basket);

      this.orderService
        .query({ filter: 'basket-is-null' })
        .pipe(
          map((res: HttpResponse<IOrder[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IOrder[]) => {
          if (!basket.order || !basket.order.id) {
            this.orders = resBody;
          } else {
            this.orderService
              .find(basket.order.id)
              .pipe(
                map((subRes: HttpResponse<IOrder>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IOrder[]) => (this.orders = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(basket: IBasket): void {
    this.editForm.patchValue({
      id: basket.id,
      basketState: basket.basketState,
      order: basket.order,
      user: basket.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basket = this.createFromForm();
    if (basket.id !== undefined) {
      this.subscribeToSaveResponse(this.basketService.update(basket));
    } else {
      this.subscribeToSaveResponse(this.basketService.create(basket));
    }
  }

  private createFromForm(): IBasket {
    return {
      ...new Basket(),
      id: this.editForm.get(['id'])!.value,
      basketState: this.editForm.get(['basketState'])!.value,
      order: this.editForm.get(['order'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasket>>): void {
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
