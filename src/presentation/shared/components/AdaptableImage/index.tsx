import { Animated, Image } from 'react-native';

import { Props } from './props';
import { styles } from './styles';

export const AdaptableImage = ({
  isAnimated,
  uri,
  animationParams,
  height,
  width,
  testID,
}: Props) => {
  if (!isAnimated || !animationParams) {
    return (
      <Image
        testID={testID}
        style={styles.image}
        source={{ uri }}
        width={width}
        height={height}
      />
    );
  }

  return (
    <Animated.Image
      testID={testID}
      style={{
        ...styles.image,
        width: animationParams.imageWidthAnimated,
        opacity: animationParams.opacityAnimated,
      }}
      source={{
        uri,
      }}
      width={width}
      height={height}
    />
  );
};
