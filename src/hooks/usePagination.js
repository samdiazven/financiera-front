import { useState } from "react";

const filterData = (arr1, value) => {
  return arr1.filter((item) => {
    return Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(value.toLowerCase())
    );
  });
};

export const usePagination = (arr, inputText) => {
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = () => {
    if (inputText.length === 0) return arr.slice(currentPage, currentPage + 10);
    const filter = filterData(arr, inputText);
    return filter.slice(currentPage, currentPage + 10);
  };

  const handleIncrease = () => {
    if (filterData(arr, inputText).length > currentPage + 10) {
      setCurrentPage(currentPage + 10);
    }
  };

  const handleDecrease = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };

  return {
    handleIncrease,
    handleDecrease,
    filteredData,
    currentPage,
  };
};
