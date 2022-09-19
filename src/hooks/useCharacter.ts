import { AllCharacters, Character, LocationType } from 'types/common';
import useFetchData from './useFetchData';

const allCharactersUrl = 'https://rickandmortyapi.com/api/character';

export const useGetLocationByName = (originName: string) => {
  const locationUrl = 'https://rickandmortyapi.com/api/location';
  const fullUrlRequest = `${locationUrl}?name=${encodeURIComponent(originName)}`;

  return useFetchData<LocationType>(fullUrlRequest);
};

export const useGetAllCharacters = () => useFetchData<AllCharacters>(allCharactersUrl);

export const useGetAllCharactersByIds = (characatersIds: number[], lazy: boolean) =>
  useFetchData<Character[]>(`${allCharactersUrl}/${characatersIds.join()}`, lazy);

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
