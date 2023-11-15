'use client';

import { createContext } from 'react';
import { Car } from '@/services/api/car/types/car';

export const CarContext = createContext<{
  car: Car | null;
}>({
  car: null,
});

export const CarActionsContext = createContext<{
  setCar: (car: Car | null) => void;
}>({
  setCar: () => {},
});
