import NavigationContext from './NavigationContext.client';

const NavigationProvider = ({children, value}) => {
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
