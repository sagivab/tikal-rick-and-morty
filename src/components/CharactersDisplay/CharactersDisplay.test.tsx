import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { awaitObj } from 'utils/common';
import CharacterDisplay from '.';

const originToLookFor = 'Earth (C-137)';
const dimensionName = 'Dimension C-137';

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    origin: { name: originToLookFor, url: 'none' },
    episode: ['1', '2', '3'],
    status: 'alive',
    species: 'human',
    gender: 'male',
    image: 'none',
    url: 'none',
    created: 'none',
  },
  {
    id: 2,
    name: 'Morty Smith',
    origin: { name: originToLookFor, url: 'none' },
    episode: ['1', '2', '3'],
    status: 'alive',
    species: 'human',
    gender: 'male',
    image: 'none',
    url: 'none',
    created: 'none',
  },
];

const title = 'Some title';

describe('CharactersDisplay', () => {
  it('Renders CharactersDisplay correctly', async () => {
    render(<CharacterDisplay characters={characters} title={title} />);
    screen.getByText(title);

    const availTrText = ['Character name', 'Origin name', 'Origin dimension', 'Popularity'];
    const trElements = screen.getAllByRole('row');
    expect(trElements.length).toBe(8);

    for (let i = 0; i < availTrText.length; i += 1) {
      const colEl = screen.getAllByRole('columnheader', {
        name: availTrText[i],
      });
      expect(colEl.length).toBe(2);
    }

    screen.getByRole('cell', {
      name: characters[0].name,
    });

    screen.getByRole('cell', {
      name: characters[1].name,
    });

    const originCell = await waitFor(
      () => screen.findAllByRole('cell', { name: dimensionName }),
      awaitObj,
    );
    expect(originCell.length).toBe(2);

    const dimensionNameCell = screen.getAllByRole('cell', {
      name: dimensionName,
    });
    expect(dimensionNameCell.length).toBe(2);

    const popularityCell = screen.getAllByRole('cell', {
      name: characters[0].episode.length.toString(),
    });
    expect(popularityCell.length).toBe(2);
  });

  it('Renders CharactersDisplay correctly when passing empty array', () => {
    render(<CharacterDisplay characters={[]} title={title} />);
    screen.getByText('There is no character to show');
  });
});
