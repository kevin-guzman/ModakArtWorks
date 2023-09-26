import { memo, useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Animated, Dimensions, Image, LayoutAnimation, Text, TouchableOpacity, View, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Props } from "./props"
import { styles } from "./styles"
import { ArtWork } from "../../../../domain/entities/artWork";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const getImageDimensions = (thumbnail: ArtWork['thumbnail']) => {
  const thumbnailWidth = thumbnail?.width || 100
  const thumbnailHeight = thumbnail?.height || 100
  const aspectRatio = thumbnailWidth / thumbnailHeight;
  const screeenPercentage = 80
  let imageWidth = (screeenPercentage / 100) * screenWidth;
  let imageHeight = (screeenPercentage / 100) * screenHeight;
  if (imageWidth / imageHeight > aspectRatio) {
    imageWidth = imageHeight * aspectRatio;
  } else {
    imageHeight = imageWidth / aspectRatio;
  }

  return { imageHeight, imageWidth }
}


export const ArtWorkCard = memo(({ artWork, addToFavoritesHandler, index, testID, animateOnRemove }: Props) => {
  const { image_id, title, thumbnail, description, inscriptions, is_favorite } = artWork;
  const isEmptyArtWork = !thumbnail || title === "Untitled" || !description || !inscriptions
  if (isEmptyArtWork) return null;

  const [filled, setFilled] = useState(is_favorite);
  const favoritesHandler = () => {
    setFilled(!filled);
    addToFavoritesHandler(artWork);
  }
  const toggleHeart = () => {
    if (!animateOnRemove) return favoritesHandler();

    animate()
  };

  useEffect(() => {
    setFilled(is_favorite);
  }, [is_favorite])

  const { imageHeight, imageWidth } = getImageDimensions(thumbnail);
  const opacityAnimated = new Animated.Value(1);
  const containerWidthAnimated = new Animated.Value(imageWidth + 50);
  const imageWidthAnimated = new Animated.Value(imageWidth);
  const animate = () => {
    const toValue = 0, useNativeDriver = false;
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
    ])
      .start(({ finished }) => {
        if (finished) {
          favoritesHandler();
        }
      });
  }

  return (
    <Animated.View
      style={{
        ...styles.frame,
        width: containerWidthAnimated,
        opacity: opacityAnimated,
      }}
    >
      <TouchableOpacity
        testID={testID}
      >
        <Animated.Image
          style={{ ...styles.image, width: imageWidthAnimated, opacity: opacityAnimated }}
          source={{ uri: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` }}
          width={imageWidth}
          height={imageHeight} />
        <View style={styles.detailsContainer}>
          <View style={styles.details} >
            <Text numberOfLines={2} >{index} - {title}</Text>
            <Text numberOfLines={3} >{inscriptions}</Text>
          </View>
          <TouchableOpacity testID={`art-work-card-like-${index}`} style={styles.favoritesIconContainer} onPress={() => toggleHeart()}>
            <Animatable.View
              animation={filled ? 'slideInDown' : ""}
              duration={700}
              style={{ transform: [{ scale: filled ? 1.2 : 1 }] }}
            >
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
    </Animated.View>
  )
}, (prevProps, nextProps) => {
  const areEqualIds = prevProps.artWork.id === nextProps.artWork.id
  const areEqualFavoriteState = prevProps.artWork.is_favorite === nextProps.artWork.is_favorite
  const shouldReload = areEqualIds && areEqualFavoriteState;
  return shouldReload;
})