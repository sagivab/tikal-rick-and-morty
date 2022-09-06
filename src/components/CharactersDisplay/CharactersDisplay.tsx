import Pagination from 'components/Pagination';
import usePagination from 'hooks/usePagination';
import useWindowSize from 'hooks/useWindowSize';
import React, { useEffect } from 'react';
import { Character } from 'types/common';

type CharacterDisplayProps = {
  characters: Character[];
  title: string;
};

export default function CharacterDisplay({ characters, title }: CharacterDisplayProps) {
  const [width] = useWindowSize();
  const pageSize = width > 768 ? 3 : 1;
  const { currentPage, prevPage, nextPage, startIndex, endIndex, totalPageCount, setCurrentPage } =
    usePagination(characters.length, pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [width]);

  if (characters.length === 0) {
    return <p> There is no character to show</p>;
  }

  return (
    <div className="flex flex-col gap-y-4 items-center text-emerald-100">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-row flex-wrap justify-evenly p-2 gap-4">
        {characters.slice(startIndex, endIndex).map(character => {
          const { name, origin, episode } = character;
          const { name: originName, dimension } = origin;
          const objToRender = {
            'Character name': name,
            'Origin name': originName,
            'Origin dimension': dimension,
            Popularity: episode.length,
          };

          return (
            <table className="w-80" key={character.name}>
              <tbody key={character.name}>
                {(Object.keys(objToRender) as Array<keyof typeof objToRender>).map(key => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{objToRender[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        nextPage={nextPage}
        prevPage={prevPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
