import { memo, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Dimensions, Image, Text, TouchableOpacity, View, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Props} from "./props"
import { styles } from "./styles"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ArtWorkCard = memo(({ artWork, addToFavoritesHandler }: Props) => {
  const toggleHeart = () => {
    setFilled(!filled);
    addToFavoritesHandler(artWork);
  };
  
  const { image_id, title, thumbnail, description, inscriptions, is_favorite } = artWork;
  const [filled, setFilled] = useState(is_favorite);
  const isEmptyArtWork = !thumbnail || title === "Untitled" || !description || !inscriptions
  if (isEmptyArtWork) return null;
  const thumbnailWidth = thumbnail?.width || 100
  const thumbnailHeight = thumbnail?.height || 100

  const aspectRatio = thumbnailWidth / thumbnailHeight;
  const screeenPercentage = 80
  let imageWidth = (screeenPercentage / 100) * screenWidth;
  let imagenHeight = (screeenPercentage / 100) * screenHeight;

  if (imageWidth / imagenHeight > aspectRatio) {
    imageWidth = imagenHeight * aspectRatio;
  } else {
    imagenHeight = imageWidth / aspectRatio;
  }

  return (
    <View style={{
      ...styles.frame,
      width: imageWidth + 50
    }} >
      <Image
        style={styles.image}
        source={{ uri: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` }}
        width={imageWidth}
        height={imagenHeight} />
      <View style={styles.detailsContainer}>
        <View style={styles.details} >
          <Text numberOfLines={2} >{title}</Text>
          <Text numberOfLines={3} >{inscriptions}</Text>
        </View>
        <TouchableOpacity style={styles.favoritesIconContainer} onPress={()=>toggleHeart()}>
          <Animatable.View
            animation={filled ? 'slideInDown' : ""}
            duration={700}
            style={{ transform: [{ scale: filled ? 1.2 : 1 }] }}
          >
            <Icon
              name={filled ? 'heart' : 'heart-o'}
              size={35}
              color={filled ? '#7A7A7A' : '#7A7A7A'}
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  )
}, (prevProps, nextProps)=>{
  const areEqualIds = prevProps.artWork.id == nextProps.artWork.id
  const areEqualFavoriteState = prevProps.artWork.is_favorite === nextProps.artWork.is_favorite
  const shouldReload = areEqualIds && areEqualFavoriteState;
  return shouldReload;
})