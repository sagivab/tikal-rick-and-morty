import { useState } from 'react';

const usePagination = (totalCount: number, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const nextPage = () => setCurrentPage(prev => (prev === totalPageCount ? prev : prev + 1));

  const prevPage = () => {
    setCurrentPage(prev => (prev === 1 ? prev : prev - 1));
  };

  return {
    currentPage,
    prevPage,
    nextPage,
    setCurrentPage,
    startIndex,
    endIndex,
    totalPageCount,
  };
};
export default usePagination;
