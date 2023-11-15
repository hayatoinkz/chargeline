import { useContext } from 'react';

import { CarContext } from './car-context';

function useCar() {
  return useContext(CarContext);
}

export default useCar;
