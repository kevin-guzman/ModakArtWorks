import "reflect-metadata";
import { describe, beforeEach, it, afterEach, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { SinonStubbedInstance } from 'sinon';

import { ArtWorksRepository } from '../../../../src/domain/repositories/artWorksRepository';
import { constants, usePaginateArtWorks } from '../../../../src/domain/useCases/usePaginateArtWorks';
import { createProviderWrapper } from "../../../__utils__/ProviderWrapper";
import { testContainer } from "../../../__utils__/testDIContainer";
import { ArtWork } from "../../../../src/domain/entities/artWork";
import { ApplicationError } from "../../../../src/domain/entities/applicationError";
import { createStubObj } from "../../../__utils__/createObjectStub";
import { testQueryClient } from "../../../__utils__/reactQueryClient";

describe('usePaginateArtWorks', () => {
  let artWorksRepositoryStub: SinonStubbedInstance<ArtWorksRepository>;

  beforeEach(() => {
    artWorksRepositoryStub = createStubObj<ArtWorksRepository>(['getPaginated']);
    testContainer.snapshot()
  })

  afterEach(() => {
    testContainer.restore();
    testQueryClient.clear();
  })

  it('Should get correctly ArtWorks', async () => {
    const expectedArtWorks: ArtWork[] = [
      {
        title: "test",
        description: "Some description",
        id: 2,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "Some description",
        id: 3,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "Some description",
        id: 1,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
    ]
    artWorksRepositoryStub.getPaginated.resolves(expectedArtWorks);
    testContainer.bind<ArtWorksRepository>("ArtWorksRepository").toConstantValue(artWorksRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => usePaginateArtWorks({ limit: 1, page: 1 }),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { artWorks } = result.current;

    expect(artWorks).toStrictEqual(expectedArtWorks)
  })

  it('Should filter invalid ArtWorks', async () => {
    const expectedArtWorks: ArtWork[] = [
      {
        title: "test",
        description: "Some description",
        id: 2,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "Some description",
        id: 3,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "Some description",
        id: 4,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
    ]
    const inputArtWorks: ArtWork[] = [
      {
        title: "test",
        description: "Some description",
        id: 2,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "",
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
      },
      {
        title: "test",
        description: "Some description",
        id: 3,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
      {
        title: "test",
        description: "Some description",
        id: 4,
        image_id: "id",
        inscriptions: "inscriptions",
        is_favorite: false,
        thumbnail: {
          alt_text: "",
          height: 20,
          lqip: "",
          width: 20
        }
      },
    ]
    artWorksRepositoryStub.getPaginated.resolves(inputArtWorks);
    testContainer.bind<ArtWorksRepository>("ArtWorksRepository").toConstantValue(artWorksRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => usePaginateArtWorks({ limit: 1, page: 1 }),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { artWorks } = result.current;

    expect(artWorks).toStrictEqual(expectedArtWorks)
  })

  it('Should fail getting ArtWorks', async () => {
    const expectedError: ApplicationError = { hasError: true, message: constants.FETCHING_ERROR }
    artWorksRepositoryStub.getPaginated.returns(Promise.reject());
    testContainer.bind<ArtWorksRepository>("ArtWorksRepository").toConstantValue(artWorksRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => usePaginateArtWorks({ limit: 1, page: 1 }),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const { error } = result.current;


    expect(error).toStrictEqual(expectedError);
  })

});