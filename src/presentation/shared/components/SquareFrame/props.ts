import { ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';

export type Props = {
  isAnimated?: boolean;
  animationParams?: {
    conatinerWidth: Animated.Value;
    opacityAnimated: Animated.Value;
  };
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
};
