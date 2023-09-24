import "reflect-metadata";
import { describe, beforeEach, it, afterEach, expect } from '@jest/globals';
import { renderHook} from '@testing-library/react-hooks';
import { SinonStubbedInstance } from 'sinon';

import { ArtWorksRepository } from '../../../../src/domain/repositories/artWorksRepository';
import { usePaginateArtWorks } from '../../../../src/domain/useCases/usePaginateArtWorks';
import { createProviderWrapper } from "../../../__utils__/ProviderWrapper";
import { testContainer } from "../../../__utils__/testDIContainer";
import { ArtWork } from "../../../../src/domain/entities/artWork";
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

  it('Should get correctly artworks', async () => {
    const expectedArtWorks: ArtWork[] = [
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
    
    artWorksRepositoryStub.getPaginated.resolves(expectedArtWorks);

    testContainer.bind<ArtWorksRepository>("ArtWorksRepository").toConstantValue(artWorksRepositoryStub);

    const { result, waitForNextUpdate } = renderHook(
      () => usePaginateArtWorks({ limit: 1, page: 1 }),
      { wrapper: createProviderWrapper(testContainer, testQueryClient) },
    )
    await waitForNextUpdate();
    const {artWorks} = result.current;

    expect(artWorks).toStrictEqual(expectedArtWorks)
  })


});