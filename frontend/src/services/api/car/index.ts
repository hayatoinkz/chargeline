import { api } from '@/services/config';

import { CAR_URL } from './config';
import { Car } from './types/car';

export type CarRegisterRequest = {
  brand: string;
  model: string;
  licensePlate: string;
  capacity: number;
  type: {
    id: number;
  };
};

export type CarRegisterResponse = Car;

export async function CarRegister(data: CarRegisterRequest) {
  try {
    const response = await api.post<CarRegisterResponse>(CAR_URL, data);

    return response;
  } catch (error) {
    console.error('error in register car => ', error);
  }
}

export async function CarEdit(id: number, data: Partial<CarRegisterRequest>) {
  try {
    const response = await api.patch<CarRegisterResponse>(CAR_URL + '/' + id, data);

    return response;
  } catch (error) {
    console.error('error in edit car => ', error);
  }
}

export async function CarDelete(id: number) {
  try {
    const response = await api.delete<CarRegisterResponse>(CAR_URL + '/' + id);

    return response;
  } catch (error) {
    console.error('error in delete car => ', error);
  }
}
