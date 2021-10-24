// Note: This must be a separate client component from your special Provider component.

import {createContext, useContext} from 'react';

const NavigationContext = createContext();

export default NavigationContext;

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('No navigation context found');
  }

  return context;
};
