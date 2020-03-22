import { IOrder } from 'app/shared/model/order.model';
import { IUser } from 'app/core/user/user.model';
import { BasketState } from 'app/shared/model/enumerations/basket-state.model';

export interface IBasket {
  id?: number;
  basketState?: BasketState;
  order?: IOrder;
  user?: IUser;
}

export class Basket implements IBasket {
  constructor(public id?: number, public basketState?: BasketState, public order?: IOrder, public user?: IUser) {}
}
