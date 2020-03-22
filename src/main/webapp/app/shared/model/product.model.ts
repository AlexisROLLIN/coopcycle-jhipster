import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IBasket } from 'app/shared/model/basket.model';
import { Disponibility } from 'app/shared/model/enumerations/disponibility.model';

export interface IProduct {
  id?: number;
  price?: number;
  disponibility?: Disponibility;
  description?: string;
  restaurant?: IRestaurant;
  basket?: IBasket;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public price?: number,
    public disponibility?: Disponibility,
    public description?: string,
    public restaurant?: IRestaurant,
    public basket?: IBasket
  ) {}
}
