import { Dimensions } from 'react-native';

import { ArtWork } from '../../../domain/entities/artWork';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const getImageDimensionsByThumbnail = (
  thumbnail: ArtWork['thumbnail'],
  percentageScreen?: number,
) => {
  const thumbnailWidth = thumbnail?.width || 100;
  const thumbnailHeight = thumbnail?.height || 100;
  const aspectRatio = thumbnailWidth / thumbnailHeight;
  const screeenPercentage = percentageScreen || 80;
  let imageWidth = (screeenPercentage / 100) * screenWidth;
  let imageHeight = (screeenPercentage / 100) * screenHeight;
  if (imageWidth / imageHeight > aspectRatio) {
    imageWidth = imageHeight * aspectRatio;
  } else {
    imageHeight = imageWidth / aspectRatio;
  }

  return { imageHeight, imageWidth };
};
