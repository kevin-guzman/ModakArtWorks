import { Animated, Image } from 'react-native';

import { Props } from './props';
import { styles } from './styles';

export const AdaptableImage = ({
  isAnimated,
  uri,
  animationParams,
  height,
  width,
}: Props) => {
  if (!isAnimated || !animationParams) {
    return (
      <Image
        style={styles.image}
        source={{ uri }}
        width={width}
        height={height}
      />
    );
  }

  return (
    <Animated.Image
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
