import { createContext, useContext } from 'react';

export function createInjectState<T>(
  initializer: (props) => T
): [React.FC, () => T] {
  const Context = createContext<T | null>(null);

  const Provider = ({ children, ...props }) => {
    const contextValue = initializer(props);
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  const useInjectState = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useInjectState must be used within its Provider');
    }
    return context;
  };

  return [Provider, useInjectState];
}
