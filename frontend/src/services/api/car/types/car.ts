import { User } from '@/services/api/auth/types/user';
import { Status } from '@/services/types/status';
import { TypeCar } from '@/services/types/type-car';

export type Car = {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
  capacity: number;
  user?: User;
  type: TypeCar;
  status: Status;
};
