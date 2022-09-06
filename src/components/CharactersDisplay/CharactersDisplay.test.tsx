import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDisplay from '.';

const originToLookFor = 'Earth (C-137)';
const dimensionName = 'Dimension C-137';

const characters = [
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
];

const title = 'Some title';

describe('CharactersDisplay', () => {
  it('Renders CharactersDisplay correctly', () => {
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

    const originCell = screen.getAllByRole('cell', {
      name: characters[0].origin.name,
    });
    expect(originCell.length).toBe(2);

    const dimensionNameCell = screen.getAllByRole('cell', {
      name: characters[0].origin.dimension,
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
