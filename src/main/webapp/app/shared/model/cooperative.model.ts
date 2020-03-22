import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface ICooperative {
  id?: number;
  name?: string;
  area?: string;
  restaurants?: IRestaurant[];
}

export class Cooperative implements ICooperative {
  constructor(public id?: number, public name?: string, public area?: string, public restaurants?: IRestaurant[]) {}
}
