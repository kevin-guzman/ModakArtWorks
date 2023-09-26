import { Animated } from 'react-native';

export type Props = {
  isAnimated?: boolean;
  animationParams?: {
    imageWidthAnimated: Animated.Value;
    opacityAnimated: Animated.Value;
  };
  uri: string;
  width: number;
  height: number;
};
