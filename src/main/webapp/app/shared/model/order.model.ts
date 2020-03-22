import { Moment } from 'moment';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IUser } from 'app/core/user/user.model';
import { IPayment } from 'app/shared/model/payment.model';
import { IBasket } from 'app/shared/model/basket.model';
import { OrderState } from 'app/shared/model/enumerations/order-state.model';

export interface IOrder {
  id?: number;
  orderState?: OrderState;
  deliveryTime?: Moment;
  restaurant?: IRestaurant;
  user?: IUser;
  payment?: IPayment;
  basket?: IBasket;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public orderState?: OrderState,
    public deliveryTime?: Moment,
    public restaurant?: IRestaurant,
    public user?: IUser,
    public payment?: IPayment,
    public basket?: IBasket
  ) {}
}
