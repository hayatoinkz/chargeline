import { useContext } from 'react';

import { CarActionsContext } from './car-context';

function useCarActions() {
  return useContext(CarActionsContext);
}

export default useCarActions;
