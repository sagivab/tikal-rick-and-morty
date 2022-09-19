import { Character } from 'types/common';

export const awaitObj = { timeout: 3000 };

export const sumEpisodesNumbersForListOfCharacters = (characters: Character[] | undefined) => {
  let sumOfEpisodes = 0;

  characters?.forEach(character => {
    sumOfEpisodes += character.episode.length;
  });

  return sumOfEpisodes;
};

// Will generate Array from 1 to n. generateArray(3) => [1,2,3]
export const generateArray = (n: number) =>
  Array(n)
    .fill(1)
    .map((d: number, i: number) => d + i);
