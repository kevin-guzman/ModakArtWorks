import "reflect-metadata";
import { describe, beforeEach, it, afterEach, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { SinonStubbedInstance } from 'sinon';

import { FavoritesRepository } from '../../../../src/domain/repositories/favoritesRepository';
import { createProviderWrapper } from "../../../__utils__/ProviderWrapper";
import { testContainer } from "../../../__utils__/testDIContainer";
import { ArtWork } from "../../../../src/domain/entities/artWork";
import { createStubObj } from "../../../__utils__/createObjectStub";
import { testQueryClient } from "../../../__utils__/reactQueryClient";
import { ArtWorksRepository } from "../../../../src/domain/repositories/artWorksRepository";
import { useFavoritesAndArtWorks } from "../../../../src/domain/useCases/useFavoritesAndArtWorks";

describe('useFavorites', () => {
  let favoritesRepositoryStub: SinonStubbedInstance<FavoritesRepository>;
  let artWorksRepositoryStub: SinonStubbedInstance<ArtWorksRepository>;


  beforeEach(() => {
    favoritesRepositoryStub = createStubObj<FavoritesRepository>(["clearAll", "getAll", "save", "deleteById"]);
    artWorksRepositoryStub = createStubObj<ArtWorksRepository>(["getPaginated"])
    testContainer.snapshot()
  })

  afterEach(() => {
    testContainer.restore();
    testQueryClient.clear();
  })

  const expectedFavorites: ArtWork[] = [
    {
      title: "test",
      description: "Some description",
      id: 2,
      image_id: "image id",
      inscriptions: "inscription",
      is_favorite: false,
      thumbnail: {
        alt_text: "",
        height: 20,
        lqip: "",
        width: 20
      }
    }
  ]

  const expectedArtWorks: ArtWork[] = [
    {
      title: "test",
      description: "Some description",
      id: 2,
      image_id: "image id",
      inscriptions: "inscription",
      is_favorite: false,
      thumbnail: {
        alt_text: "",
        height: 20,
        lqip: "",
        width: 20
      }
    },
    {
      title: "test12",
      description: "Some description12",
      id: 12,
      image_id: "image id",
      inscriptions: "inscription",
      is_favorite: false,
      thumbnail: {
        alt_text: "",
        height: 20,
        lqip: "",
        width: 20
      }
    }
  ]

  it('Should get merge favorites and arworks', async () => {
    favoritesRepositoryStub.getAll.resolves(expectedFavorites);
    artWorksRepositoryStub.getPaginated.resolves(expectedArtWorks)
    testContainer.bind<FavoritesRepository>("FavoritesRepository").toConstantValue(favoritesRepositoryStub);
    testContainer.bind<ArtWorksRepository>("ArtWorksRepository").toConstantValue(artWorksRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => useFavoritesAndArtWorks({limit:2, page:1}),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { artWorks } = result.current;

    expect(artWorks[0].is_favorite).toBeTruthy()
    expect(artWorks[1].is_favorite).toBeFalsy()
  })
});