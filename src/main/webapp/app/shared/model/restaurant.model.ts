import { IUser } from 'app/core/user/user.model';
import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  description?: string;
  owner?: IUser;
  cooperatives?: ICooperative[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public owner?: IUser,
    public cooperatives?: ICooperative[]
  ) {}
}
