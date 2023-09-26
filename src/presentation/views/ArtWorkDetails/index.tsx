import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/paramsList';
import { BackgroundView } from '../../shared/components/BackgroundView';
import { useGetArtWorkDetail } from '../../../domain/useCases/useGetArtWorkDetails';
import { AdaptableImage } from '../../shared/components/AdaptableImage';
import { getImageDimensionsByThumbnail } from '../../shared/functions/getImageDimensionsByThumbnail';
import { aic } from '../../../infrastructure/config/api/urls';
import { SquareFrame } from '../../shared/components/SquareFrame';
import { View } from 'react-native-animatable';
import {
  DrawerPurpose,
  useDrawerPurpose,
} from '../../navigation/context/useDrawerIconPurpose';
import { useFocusEffect } from '@react-navigation/native';

export const sanitizeDescription = (
  description?: string | null | undefined,
): string => {
  const isEmptyDesciption = !description || description?.length === 0;
  if (isEmptyDesciption || description === null || description === undefined)
    return '';
  const replaceTerms = [
    /<a[^>]*>.*?<\/a>/g,
    /<br\s*\/?>/gi,
    /<\/?em[^>]*>/gi,
    /<\/?p[^>]*>/gi,
  ];
  replaceTerms.forEach(term => {
    description = description?.replaceAll(term, '');
  });
  return description;
};

export function ArtWorkDetails({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ArtWorkDetails'>) {
  const { id, thumbnail, image_id, title } = route.params.artWork;
  const { setDrawerPurpose } = useDrawerPurpose();

  useFocusEffect(
    useCallback(() => {
      setDrawerPurpose(DrawerPurpose.BackNavigation);
      animate();
      return () => {
        setDrawerPurpose(DrawerPurpose.ToggleDrawerMenu);
      };
    }, []),
  );

  const { details, error, onReload, isLoading } = useGetArtWorkDetail(id);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    onReload();
    setRefreshing(true);
    // Animate loader for a while
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const { imageHeight, imageWidth } = getImageDimensionsByThumbnail(
    thumbnail,
    90,
  );

  const opacityAnimated = new Animated.Value(0);
  const containerWidthAnimated = new Animated.Value(0);
  const imageWidthAnimated = new Animated.Value(100);

  // TODO test animation to resize art work
  const animate = () => {
    const useNativeDriver = false;
    Animated.parallel([
      Animated.timing(containerWidthAnimated, {
        toValue: imageWidth + 30,
        duration: 500,
        useNativeDriver,
      }),
      Animated.timing(imageWidthAnimated, {
        toValue: imageWidth + 500,
        duration: 450,
        useNativeDriver,
      }),
      Animated.timing(opacityAnimated, {
        toValue: 1,
        duration: 450,
        useNativeDriver,
      }),
    ]).start(() => {});
  };

  let detailsComponent;
  if (isLoading) {
    detailsComponent = (
      <ActivityIndicator style={{ alignSelf: 'center' }} size={40} />
    );
  } else if (error.hasError) {
    detailsComponent = (
      <Text
        style={{
          fontStyle: 'italic',
          color: 'white',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        {error.message}
      </Text>
    );
  } else {
    detailsComponent = (
      <View>
        <Text
          testID="atr-work-details[artis]"
          style={{
            fontStyle: 'italic',
            color: 'white',
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          {details?.artist_display}
        </Text>

        <Text
          testID="atr-work-details[description]"
          style={{
            fontStyle: 'italic',
            color: 'white',
            alignSelf: 'center',
            marginVertical: 5,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontStyle: 'italic',
              color: 'white',
              alignSelf: 'center',
              marginVertical: 15,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Description{'\n\n'}
          </Text>
          {sanitizeDescription(details?.description)}
        </Text>

        {details?.exhibition_history &&
          details?.exhibition_history?.length > 0 && (
            <Text
              testID="atr-work-details[exhibition-history]"
              style={{
                fontStyle: 'italic',
                color: 'white',
                alignSelf: 'center',
                marginVertical: 5,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontStyle: 'italic',
                  color: 'white',
                  alignSelf: 'center',
                  marginVertical: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Exhibition History{'\n\n'}
              </Text>
              {details?.exhibition_history}
            </Text>
          )}
      </View>
    );
  }

  return (
    <BackgroundView style={{ paddingTop: 15 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SquareFrame
          testID="art-works-detail-frame"
          style={{ borderWidth: 8, padding: 5 }}>
          <AdaptableImage
            testID="art-works-detail-image"
            uri={aic.images.getById(image_id)}
            height={imageHeight}
            width={imageWidth}
          />
        </SquareFrame>

        <Text
          style={{
            fontStyle: 'italic',
            color: 'white',
            alignSelf: 'center',
            marginVertical: 10,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        {detailsComponent}
      </ScrollView>
    </BackgroundView>
  );
}
