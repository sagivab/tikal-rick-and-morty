import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import {
  GET_CHARACTERS_EPISODES_AND_ORIGIN_BY_IDS,
  GET_CHARACTERS_NUMBER,
} from 'hooks/useCharacter';
import App from './App';

const originToLookFor = 'Earth (C-137)';
const dimensionName = 'Dimension C-137';
const charactersNumberMock = {
  request: {
    query: GET_CHARACTERS_NUMBER,
  },
  result: {
    data: { characters: { info: { count: 10 } } },
  },
};

const charactersMock = {
  request: {
    query: GET_CHARACTERS_EPISODES_AND_ORIGIN_BY_IDS,
    variables: { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], skip: false },
  },
  result: {
    data: {
      charactersByIds: [
        {
          id: 'unique1',
          name: 'Rick Sanchez',
          origin: { name: originToLookFor, dimension: dimensionName },
          episode: [{ id: '1' }, { id: '2' }, { id: '3' }],
        },
        {
          id: 'unique2',
          name: 'Morty Smith',
          origin: { name: originToLookFor, dimension: dimensionName },
          episode: [{ id: '1' }, { id: '2' }, { id: '3' }],
        },
      ],
    },
  },
};

describe('App', () => {
  it('Renders App correctly', async () => {
    render(
      <MockedProvider addTypename={false} mocks={[charactersNumberMock, charactersMock]}>
        <App />
      </MockedProvider>,
    );

    const { charactersByIds: characters } = charactersMock.result.data;

    expect(screen.getAllByText('Loading...').length).toBe(2);

    const availTrText = ['Character name', 'Origin name', 'Origin dimension', 'Popularity'];
    const trElements = await screen.findAllByRole('row');
    expect(trElements.length).toBe(8);

    for (let i = 0; i < availTrText.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const colEl = await screen.findAllByRole('columnheader', {
        name: availTrText[i],
      });
      expect(colEl.length).toBe(2);
    }

    await screen.findByRole('cell', {
      name: characters[0].name,
    });

    await screen.findByRole('cell', {
      name: characters[1].name,
    });

    const originCell = await screen.findAllByRole('cell', {
      name: characters[0].origin.name,
    });
    expect(originCell.length).toBe(2);

    const dimensionNameCell = await screen.findAllByRole('cell', {
      name: characters[0].origin.dimension,
    });
    expect(dimensionNameCell.length).toBe(2);

    const popularityCell = await screen.findAllByRole('cell', {
      name: characters[0].episode.length.toString(),
    });
    expect(popularityCell.length).toBe(2);
    expect(
      await screen.findByText(`The most unpopular characters from ${originToLookFor}:`),
    ).toBeInTheDocument();
  });

  it('Renders App error properly', async () => {
    const mockWithError = {
      request: charactersMock.request,
      error: new Error('Throw error'),
    };
    render(
      <MockedProvider addTypename={false} mocks={[mockWithError]}>
        <App />
      </MockedProvider>,
    );

    expect(await screen.findByText('Something went wrong!')).toBeInTheDocument();
  });

  it('Renders App properly when there is only 1 match', async () => {
    const charactersMockOneMatch = {
      request: charactersMock.request,
      result: {
        data: {
          charactersByIds: [charactersMock.result.data.charactersByIds[0]],
        },
      },
    };
    render(
      <MockedProvider addTypename={false} mocks={[charactersNumberMock, charactersMockOneMatch]}>
        <App />
      </MockedProvider>,
    );

    expect(
      await screen.findByText(`The most unpopular character from ${originToLookFor}:`),
    ).toBeInTheDocument();
  });
});
