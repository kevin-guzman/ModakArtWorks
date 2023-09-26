import { ReactNode, createContext, useContext, useState } from 'react';
import { View } from 'react-native';

export enum DrawerPurpose {
  ToggleDrawerMenu = 'toggle',
  BackNavigation = 'back',
}

type DrawerContextType = {
  purpose: DrawerPurpose;
  setDrawerPurpose: (purpose: DrawerPurpose) => void;
};

const DrawerContext = createContext<DrawerContextType>({
  purpose: DrawerPurpose.ToggleDrawerMenu,
  setDrawerPurpose: (purpose: DrawerPurpose) => {},
});

export function useDrawerPurpose() {
  return useContext(DrawerContext);
}

type Props = {
  children: ReactNode;
};

export function DrawerProvider({ children }: Props) {
  const [purpose, setPurpose] = useState<DrawerPurpose>(
    DrawerPurpose.ToggleDrawerMenu,
  );

  const setDrawerPurpose = (purpose: DrawerPurpose) => {
    setPurpose(purpose);
  };

  return (
    <DrawerContext.Provider value={{ purpose, setDrawerPurpose }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function withDrawerContext<TProps>(
  Component: React.ComponentType<TProps & { drawerContext: DrawerContextType }>,
) {
  return function WithDrawerContext(props: TProps) {
    return (
      <DrawerContext.Consumer>
        {drawerContext => (
          <Component {...props} drawerContext={drawerContext} />
        )}
      </DrawerContext.Consumer>
    );
  };
}
