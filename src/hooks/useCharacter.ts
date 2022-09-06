import { gql, useQuery } from '@apollo/client';
import { Character, CharacterNumber, Characters, ChartactersEpisodes } from 'types/common';

export const GET_CHARACTERS_EPISODES_AND_ORIGIN_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      origin {
        name
        dimension
      }
      episode {
        id
      }
    }
  }
`;

export const GET_CHARACTERS_NUMBER = gql`
  {
    characters {
      info {
        count
      }
    }
  }
`;

const GET_CHARACTER_EPISODES_BY_NAME = gql`
  query GetCharacterByName($name: String) {
    characters(filter: { name: $name }) {
      results {
        episode {
          id
        }
      }
    }
  }
`;

export const useGetCharactersNumber = () => useQuery<CharacterNumber>(GET_CHARACTERS_NUMBER);

export const useGetCharactersByIds = (ids: number[] | string[], skip: boolean) =>
  useQuery<Characters>(GET_CHARACTERS_EPISODES_AND_ORIGIN_BY_IDS, {
    variables: { ids, skip },
  });

export const useGetCharacterEpisodesByName = (name: string) =>
  useQuery<ChartactersEpisodes>(GET_CHARACTER_EPISODES_BY_NAME, {
    variables: { name },
  });

export const useGetNumOfEpisodesByNames = (characters: Character[], names: string[]) =>
  names.map(name => {
    const charactersToSum = characters.filter(character => character.name === name);
    const value =
      charactersToSum?.reduce(
        (accumulator, character) => accumulator + character.episode.length,
        0,
      ) || 0;

    return { title: name, value };
  });

export const useGetMostUnpopularCharacterByOrigin = (
  characters: Character[],
  originToLookFor: string,
) => {
  const filteredCharactersByOrigin = characters.filter(
    character => character.origin.name === originToLookFor,
  );

  const minNumEpisodes = Math.min.apply(
    null,
    filteredCharactersByOrigin?.map(character => character.episode.length) || [
      Number.MAX_SAFE_INTEGER,
    ],
  );

  const charactersWithLeastEpisodes =
    filteredCharactersByOrigin?.filter(character => character.episode.length === minNumEpisodes) ||
    [];

  return charactersWithLeastEpisodes;
};
