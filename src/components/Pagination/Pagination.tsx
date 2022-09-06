import React, { ReactElement } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPageCount: number;
  prevPage: () => void;
  nextPage: () => void;
  setCurrentPage: (n: number) => void;
};

export default function Pagination({
  currentPage,
  prevPage,
  nextPage,
  totalPageCount,
  setCurrentPage,
}: PaginationProps) {
  const renderButtonsPages = (n: number): ReactElement[] => {
    const buttonsArray = [];
    for (let i = currentPage - n + 1; i < currentPage + n; i += 1) {
      const className = currentPage === i ? 'bg-secondary' : '';
      if (i > 0 && i <= totalPageCount) {
        buttonsArray.push(
          <button
            key={i}
            type="button"
            className={`${className} p-2 rounded-md`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>,
        );
      }
    }

    return buttonsArray;
  };

  return (
    <div className="flex items-center gap-x-4 justify-around w-96">
      <div className="flex gap-x-2">
        <button
          type="button"
          className="p-2 rounded-md font-bold bg-secondary disabled:invisible"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          &#8882;&#8882;
        </button>
        <button
          type="button"
          className="p-2 rounded-md font-bold bg-secondary disabled:invisible"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          <span className="text-lg">&#8882;</span>Prev
        </button>
      </div>
      <div>
        <div className="flex gap-x-2">{renderButtonsPages(3).map(Button => Button)}</div>
      </div>

      <div className="flex gap-x-2">
        <button
          type="button"
          className="p-2 rounded-md font-bold bg-secondary disabled:invisible"
          disabled={currentPage === totalPageCount}
          onClick={nextPage}
        >
          Next<span className="text-lg">&#8883;</span>
        </button>
        <button
          type="button"
          className="p-2 rounded-md font-bold bg-secondary disabled:invisible"
          disabled={currentPage === totalPageCount}
          onClick={() => setCurrentPage(totalPageCount)}
        >
          &#8883;&#8883;
        </button>
      </div>
    </div>
  );
}
