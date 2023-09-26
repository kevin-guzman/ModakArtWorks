import "reflect-metadata";
import { expect, element, device, waitFor, by } from 'detox';
import { describe, beforeEach, beforeAll, test, expect as jestExpect } from '@jest/globals';

describe('Adding to favorites', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  const existTime = 5000;
  test('Adding element to favorites', async () => {
    // Render artworks list
    await expect(element(by.id('art-works-list'))).toBeVisible()

    // Find for the first artwork 
    await waitFor(element(by.id('art-work-card'))).toExist().withTimeout(10000)
    await waitFor(element(by.id('art-work-card')).atIndex(0)).toExist().withTimeout(existTime)

    // Press heart of the artwork
    await waitFor(element(by.id('art-work-card-like-0'))).toExist().withTimeout(existTime)
    await element(by.id('art-work-card-like-0')).tap();
    await waitFor(element(by.id('art-work-card-like-icon-0'))).toExist().withTimeout(existTime)
    const likedAttributes = await element(by.id('art-work-card-like-icon-0')).getAttributes();

    // Open drawer navigation and navigate to Favorites
    await element(by.id('drawer-menu')).tap();
    await expect(element(by.text('Favorites'))).toBeVisible();
    await element(by.text('Favorites')).tap();

    // Cehck for the added element
    await expect(element(by.id('art-works-list'))).toBeVisible()
    await waitFor(element(by.id('art-work-card'))).toExist().withTimeout(10000)
    await waitFor(element(by.id('art-work-card')).atIndex(0)).toExist().withTimeout(existTime)

    // Press again the heart
    await waitFor(element(by.id('art-work-card-like-0'))).toExist().withTimeout(existTime)
    await element(by.id('art-work-card-like-0')).tap();

    // Open drawer navigation and navigate to Gallery
    await element(by.id('drawer-menu')).tap();
    await expect(element(by.text('Gallery'))).toBeVisible();
    await element(by.text('Gallery')).tap();

    // Validate that the artwork is unliked
    const unlikedAttributes = await element(by.id('art-work-card-like-icon-0')).getAttributes();
    jestExpect(likedAttributes).not.toStrictEqual(unlikedAttributes);
  })
});
