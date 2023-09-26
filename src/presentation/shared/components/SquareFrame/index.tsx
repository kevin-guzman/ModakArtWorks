import { Animated, View } from 'react-native';

import { Props } from './props';
import { styles } from './styles';

export const SquareFrame = ({
  animationParams,
  isAnimated,
  children,
  style,
}: Props) => {
  const baseStyle = { ...styles.frame, ...style };

  if (!isAnimated || !animationParams) {
    return <View style={baseStyle}>{children}</View>;
  }

  return (
    <Animated.View
      style={{
        ...baseStyle,
        width: animationParams.conatinerWidth,
        opacity: animationParams.opacityAnimated,
      }}>
      {children}
    </Animated.View>
  );
};
