import { memo, useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Props } from './props';
import { styles } from './styles';
import { aic } from '../../../../infrastructure/config/api/urls';
import { AdaptableImage } from '../AdaptableImage';
import { getImageDimensionsByThumbnail } from '../../functions/getImageDimensionsByThumbnail';
import { SquareFrame } from '../SquareFrame';

export const ArtWorkCard = memo(
  ({
    artWork,
    addToFavoritesHandler,
    index,
    testID,
    animateOnRemove,
    onCardPress,
  }: Props) => {
    const {
      image_id,
      title,
      thumbnail,
      description,
      inscriptions,
      is_favorite,
    } = artWork;
    const isEmptyArtWork =
      !thumbnail || title === 'Untitled' || !description || !inscriptions;
    if (isEmptyArtWork) return null;

    const [filled, setFilled] = useState(is_favorite);
    const favoritesHandler = () => {
      setFilled(!filled);
      addToFavoritesHandler(artWork);
    };
    const toggleHeart = () => {
      if (!animateOnRemove) return favoritesHandler();

      animate();
    };

    useEffect(() => {
      setFilled(is_favorite);
    }, [is_favorite]);

    const { imageHeight, imageWidth } =
      getImageDimensionsByThumbnail(thumbnail);
    const opacityAnimated = new Animated.Value(1);
    const containerWidthAnimated = new Animated.Value(imageWidth + 50);
    const imageWidthAnimated = new Animated.Value(imageWidth);
    const animate = () => {
      const toValue = 0,
        useNativeDriver = false;
      Animated.parallel([
        Animated.timing(containerWidthAnimated, {
          toValue,
          duration: 500,
          useNativeDriver,
        }),
        Animated.timing(imageWidthAnimated, {
          toValue,
          duration: 450,
          useNativeDriver,
        }),
        Animated.timing(opacityAnimated, {
          toValue,
          duration: 450,
          useNativeDriver,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          favoritesHandler();
        }
      });
    };

    return (
      <SquareFrame
        isAnimated={animateOnRemove}
        animationParams={{
          conatinerWidth: containerWidthAnimated,
          opacityAnimated,
        }}>
        <TouchableOpacity onPress={() => onCardPress(artWork)} testID={testID}>
          <AdaptableImage
            uri={aic.images.getById(image_id)}
            isAnimated={animateOnRemove}
            animationParams={{ imageWidthAnimated, opacityAnimated }}
            width={imageWidth}
            height={imageHeight}
          />
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <Text numberOfLines={2}>{title}</Text>
              <Text numberOfLines={3}>{inscriptions}</Text>
            </View>
            <TouchableOpacity
              testID={`art-work-card-like-${index}`}
              style={styles.favoritesIconContainer}
              onPress={() => toggleHeart()}>
              <Animatable.View
                animation={filled ? 'slideInDown' : ''}
                duration={700}
                style={{ transform: [{ scale: filled ? 1.2 : 1 }] }}>
                <Icon
                  testID={`art-work-card-like-icon-${index}`}
                  name={filled ? 'heart' : 'heart-o'}
                  size={filled ? 35 : 30}
                  color={filled ? '#7A7A7A' : '#7A7A7A'}
                />
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </SquareFrame>
    );
  },
  (prevProps, nextProps) => {
    const areEqualIds = prevProps.artWork.id === nextProps.artWork.id;
    const areEqualFavoriteState =
      prevProps.artWork.is_favorite === nextProps.artWork.is_favorite;
    const shouldReload = areEqualIds && areEqualFavoriteState;
    return shouldReload;
  },
);
