import { TypeFuel } from '@/services/types/type-fuel';

import { Car } from '../../car/types/car';

export type FuelSupply = {
  id: number;
  quantity: number;
  price: number;
  totalPrice: number;
  car: Car;
  type: TypeFuel;
  createdAt: string;
  updatedAt: string;
};
