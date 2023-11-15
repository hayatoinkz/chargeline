'use client';

import { PropsWithChildren, useMemo, useState } from 'react';
import { Car } from '@/services/api/car/types/car';

import { CarActionsContext, CarContext } from './car-context';

function CarProvider(props: PropsWithChildren<{}>) {
  const [car, setCar] = useState<Car | null>(null);

  const contextValue = useMemo(
    () => ({
      car,
    }),
    [car],
  );

  const contextActionsValue = useMemo(
    () => ({
      setCar,
    }),
    [],
  );

  return (
    <CarContext.Provider value={contextValue}>
      <CarActionsContext.Provider value={contextActionsValue}>
        {props.children}
      </CarActionsContext.Provider>
    </CarContext.Provider>
  );
}

export default CarProvider;
