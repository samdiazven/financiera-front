import { useState } from "react";

const filterData = (arr1, value) => {
  return arr1.filter((item) => {
    return Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(value.toLowerCase())
    );
  });
};

export const usePagination = (arr, inputText) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(0);

  const filteredData = () => {
    if (inputText.length === 0) return arr.slice(countPage, countPage + 10);
    const filter = filterData(arr, inputText);
    return filter.slice(countPage, countPage + 10);
  };

  const handleIncrease = () => {
    if (filterData(arr, inputText).length > countPage + 10) {
      setCountPage(countPage + 10);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDecrease = () => {
    if (countPage > 0) {
      setCountPage(countPage - 10);

      setCurrentPage(currentPage - 1);
    }
  };

  return {
    handleIncrease,
    handleDecrease,
    filteredData,
    currentPage,
    total: arr.length,
  };
};
