import "reflect-metadata";
import { describe, beforeEach, it, afterEach, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { SinonStubbedInstance } from 'sinon';

import { FavoritesRepository } from '../../../../src/domain/repositories/favoritesRepository';
import { constants, useFavorites } from '../../../../src/domain/useCases/useFavorites';
import { createProviderWrapper } from "../../../__utils__/ProviderWrapper";
import { testContainer } from "../../../__utils__/testDIContainer";
import { ArtWork } from "../../../../src/domain/entities/artWork";
import { ApplicationError } from "../../../../src/domain/entities/applicationError";
import { createStubObj } from "../../../__utils__/createObjectStub";
import { testQueryClient } from "../../../__utils__/reactQueryClient";

describe('useFavorites', () => {
  let favoritesRepositoryStub: SinonStubbedInstance<FavoritesRepository>;

  beforeEach(() => {
    favoritesRepositoryStub = createStubObj<FavoritesRepository>(["clearAll", "getAll", "save", "deleteById", "existById", "saveOne"]);
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
      image_id: "",
      inscriptions: "",
      is_favorite: false,
      thumbnail: {
        alt_text: "",
        height: 20,
        lqip: "",
        width: 20
      }
    }
  ]
  it('Should get correctly favorites from storage', async () => {
    favoritesRepositoryStub.getAll.resolves(expectedFavorites);
    testContainer.bind<FavoritesRepository>("FavoritesRepository").toConstantValue(favoritesRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => useFavorites(),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { favorites } = result.current;

    expect(favorites).toStrictEqual(expectedFavorites)
  })

  it('Should fail getting ArtWorks', async () => {
    const expectedError: ApplicationError = { hasError: true, message: constants.FETCHING_ERROR }
    favoritesRepositoryStub.getAll.rejects(new Error(constants.FETCHING_ERROR));
    testContainer.bind<FavoritesRepository>("FavoritesRepository").toConstantValue(favoritesRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => useFavorites(),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { error } = result.current;


    expect(error).toStrictEqual(expectedError);
  })

  describe('onFavoriteChange', () => {
    const existingFavorites: ArtWork[] = [
      {
        title: "test",
        description: "Some description",
        id: 2,
        image_id: "",
        inscriptions: "",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test1",
        description: "Some description1",
        id: 1,
        image_id: "",
        inscriptions: "",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      }
    ];


    it('Should remove element because it already exists', async () => {
      const element: ArtWork = {
        title: "test",
        description: "Some description",
        id: 2,
        image_id: "",
        inscriptions: "",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      };
      favoritesRepositoryStub.getAll.resolves(existingFavorites);
      favoritesRepositoryStub.existById.resolves(true);
      favoritesRepositoryStub.deleteById.resolves(existingFavorites.filter(fav => fav.id !== element.id));
      testContainer.bind<FavoritesRepository>("FavoritesRepository").toConstantValue(favoritesRepositoryStub);

      const { result, waitForNextUpdate } = renderHook(
        () => useFavorites(),
        { wrapper: createProviderWrapper(testContainer, testQueryClient) },
      )
      await waitForNextUpdate();
      act(() => {
        result.current.onFavoriteChange(element);
      })
      await waitForNextUpdate();
      const { favorites } = result.current;

      expect(favorites).toStrictEqual(existingFavorites.filter(fav => fav.id !== element.id))
    })

    it('Should add element beacuse does not exist', async () => {
      const element: ArtWork = {
        title: "test",
        description: "Some description",
        id: 3,
        image_id: "",
        inscriptions: "",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      };
      favoritesRepositoryStub.getAll.resolves(existingFavorites);
      favoritesRepositoryStub.existById.resolves(false);
      favoritesRepositoryStub.saveOne.resolves(existingFavorites.concat(element));
      testContainer.bind<FavoritesRepository>("FavoritesRepository").toConstantValue(favoritesRepositoryStub);

      const { result, waitForNextUpdate } = renderHook(
        () => useFavorites(),
        { wrapper: createProviderWrapper(testContainer, testQueryClient) },
      )
      await waitForNextUpdate();
      act(() => {
        result.current.onFavoriteChange(element);
      })
      await waitForNextUpdate();
      const { favorites } = result.current;

      expect(favorites).toStrictEqual(existingFavorites.concat(element))
    })
  })
});