import "reflect-metadata";
import { expect, element, device, waitFor, by } from 'detox';
import { describe, beforeEach, beforeAll, test, expect as jestExpect } from '@jest/globals';

describe('Art works detail screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  const existTime = 5000;
  test('Navigating to art works detail screen', async () => {
    // Render artworks list
    await expect(element(by.id('art-works-list'))).toBeVisible()

    // Find for the first artwork and tap
    await waitFor(element(by.id('art-work-card'))).toExist().withTimeout(10000)
    await waitFor(element(by.id('art-work-card')).atIndex(0)).toExist().withTimeout(existTime)
    await element(by.id('art-work-card')).atIndex(0).tap();

    // Search for the artits, description and exhibition hsotory
    await waitFor(element(by.id('atr-work-details[artis]'))).toExist().withTimeout(10000)
    await waitFor(element(by.id('atr-work-details[description]'))).toExist().withTimeout(existTime)
    await waitFor(element(by.id('atr-work-details[exhibition-history]'))).toExist().withTimeout(existTime)
    await waitFor(element(by.id('art-works-detail-frame'))).toExist().withTimeout(existTime)
    await waitFor(element(by.id('art-works-detail-image'))).toExist().withTimeout(existTime)

    // Navigate back
    await waitFor(element(by.id('back-menu'))).toExist().withTimeout(existTime)
    await element(by.id('back-menu')).tap();
  })
});
