import React, { useRef } from "react";

interface iSearchProduct {
  getProduct: (search?: string) => void;
}
export default function SearchProduct({ getProduct }: iSearchProduct) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    getProduct(inputRef?.current?.value);
  };
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        ref={inputRef}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
    </div>
  );
}
