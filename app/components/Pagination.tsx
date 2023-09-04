import React from "react";
import { iPaginationConfig } from "../product/ProductList";

interface iPagination {
  config: iPaginationConfig;
  handleClick: (i: number) => void;
}

export default function Pagination({
  config,
  handleClick,
}: iPagination) {
  const renderButtons = () => {
    const buttons = [];
    let startPage = 1;
    let endPage = Math.min(5, config.totalPage);

    if (config.page <= 2) {
      startPage = 1;
      endPage = Math.min(5, config.totalPage);
    } else if (config.page >= config.totalPage - 1) {
      startPage = Math.max(1, config.totalPage - 4);
      endPage = config.totalPage;
    } else {
      startPage = Math.max(1, config.page - 2);
      endPage = Math.min(config.page + 2, config.totalPage);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`pagination-item  ${config.page === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex gap-2 justify-end items-center">
      <button
        disabled={config.page === 1}
        onClick={() => handleClick(config.page - 1)}
        className={`pagination-item `}
      >
        Prev
      </button>
      {renderButtons()}
      <button
        disabled={config.page === config.totalPage}
        onClick={() => handleClick(config.page + 1)}
        className={`pagination-item `}
      >
        Next
      </button>
    </div>
  );
}
