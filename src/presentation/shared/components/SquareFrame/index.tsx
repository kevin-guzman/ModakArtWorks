import { Animated, View } from 'react-native';

import { Props } from './props';
import { styles } from './styles';

export const SquareFrame = ({
  animationParams,
  isAnimated,
  children,
  style,
  testID,
}: Props) => {
  const baseStyle = { ...styles.frame, ...style };

  if (!isAnimated || !animationParams) {
    return (
      <View testID={testID} style={baseStyle}>
        {children}
      </View>
    );
  }

  return (
    <Animated.View
      testID={testID}
      style={{
        ...baseStyle,
        width: animationParams.conatinerWidth,
        opacity: animationParams.opacityAnimated,
      }}>
      {children}
    </Animated.View>
  );
};
