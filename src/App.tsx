import React from 'react';
import Barchart from 'components/Barchart';
import CharactersDisplay from 'components/CharactersDisplay';
import ErrorBoundary from 'components/ErrorBoundary';
import {
  useGetAllCharacters,
  useGetAllCharactersByIds,
  useGetMostUnpopularCharacterByOrigin,
  useGetNumOfEpisodesByNames,
} from 'hooks/useCharacter';
import Spinner from 'components/Spinner';
import { generateArray } from 'utils/common';

function App() {
  // Constant data.
  const names = ['Rick Sanchez', 'Summer Smith', 'Morty Smith', 'Beth Smith', 'Jerry Smith'];
  const originToLookFor = 'Earth (C-137)';
  const pageHeading = 'Welcome! Rick & Morty data UI';

  // Get the number of all available characters
  const allCharactersResponse = useGetAllCharacters();

  // All characters IDs(array) from 1 - to the number of characters.
  const characatersIds: number[] =
    (allCharactersResponse.data?.info.count &&
      generateArray(allCharactersResponse.data?.info.count)) ||
    [];

  const allCharactersByIdsResponse = useGetAllCharactersByIds(
    characatersIds,
    allCharactersResponse.loading || allCharactersResponse.error !== '',
  );

  const characters = allCharactersByIdsResponse.data || [];

  // Get data for most unpopular from all characters array
  const charactersWithLeastEpisodes = useGetMostUnpopularCharacterByOrigin(
    characters,
    originToLookFor,
  );

  // // Get number of episode by name from all characters array
  const barchartData = useGetNumOfEpisodesByNames(characters, names);

  const loading = allCharactersByIdsResponse.loading || allCharactersByIdsResponse.loading;

  const error = allCharactersByIdsResponse.error || allCharactersByIdsResponse.error;

  if (error) {
    return <div>Something went wrong!</div>;
  }

  const additionalS = charactersWithLeastEpisodes.length > 1 ? 's' : '';
  return (
    <>
      <header className="flex justify-center items-center  p-2">
        <img src="/rickandmorty.jpg" alt="rickandmorty" />
        <h1 className="font-bold text-xl text-primary md:text-4xl p-4 text-center max-w-xl">
          {pageHeading}
        </h1>
      </header>

      <main className="grid justify-items-center items-center md:grid-cols-4 grid-rows-auto-repeat-1fr md:grid-rows-auto-1fr gap-y-16">
        <ErrorBoundary>
          <section className="col-span-4 md:col-span-3">
            {loading ? (
              <Spinner />
            ) : (
              <CharactersDisplay
                characters={charactersWithLeastEpisodes}
                title={`The most unpopular character${additionalS} from ${originToLookFor}:`}
              />
            )}
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section className="relative col-span-4 md:col-span-1 max-w-xs md:max-w-md">
            {loading ? (
              <Spinner />
            ) : (
              <Barchart chartData={barchartData}>
                <h2 className="text-lg font-bold text-secondary">
                  If you watched <span className="text-primary"> Rick & Morty</span> you already
                  knows who&rsquo;s the most unpopular in the Smith family, but let me visualize it
                  for you...
                </h2>
              </Barchart>
            )}
          </section>
        </ErrorBoundary>
      </main>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx="true">
        {`
          body {
            background-color: black;
          }
        `}
      </style>
    </>
  );
}

export default App;
