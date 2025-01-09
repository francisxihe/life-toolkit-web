import { createContext, useContext, useState } from 'react';

export function createInjectState<T>(initializer: () => T) {
  const Context = createContext<T | null>(null);

  const Provider = ({ children }) => {
    const contextValue = initializer();
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  const useInjectState = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useInjectState must be used within its Provider');
    }
    return context;
  };

  return { Provider, useInjectState };
}
