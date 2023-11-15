import { api } from '@/services/config';

import { FUEL_SUPPLY_URL } from './config';
import { FuelSupply } from './types/fuel-supply';

export type FuelSupplyRegisterRequest = {
  quantity: number;
  price: number;
  totalPrice: number;
  car: {
    id: number;
  };
  type: {
    id: number;
  };
};

export type FuelSupplyRegisterResponse = FuelSupply;

export async function FuelSupplyRegister(data: FuelSupplyRegisterRequest) {
  try {
    const response = await api.post<FuelSupplyRegisterResponse>(FUEL_SUPPLY_URL, data);

    return response;
  } catch (error) {
    console.error('error in register fuel supply => ', error);
  }
}
