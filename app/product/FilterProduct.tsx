import React, { useEffect, useState } from "react";

interface iFilterProduct {
  isFilterOpen: boolean;
  applyFilter:(filter:any)=>void;
}

export default function FilterProduct({
  isFilterOpen,
  applyFilter
}: iFilterProduct) {
  const [categories, setCategories] = useState<string[]>();
  const [brands, setBrands] = useState<string[]>()
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory,setSelectedCategory]=useState("")
  const [selectedBrand,setSelectedBrand]=useState("")

  const getFilterCategories = async () => {
    try{
      const res = await fetch('https://dummyjson.com/products/categories')
      const data = await res.json();

      setCategories(data)

    }catch(e){
      console.log(e)
    }
  };

  const getFilterBrand = async () => {
    try{
      const res = await fetch('https://dummyjson.com/products?limit=0');
      const data = await res.json();
      let brandArray= new Set();
      data?.products?.map((e:any)=>{
        brandArray.add(e?.brand)
      })
      
      setBrands(Array.from(brandArray) as string[])

    }catch(e){
      console.log(e)
    }
  };

  useEffect(()=>{
    getFilterCategories();
    getFilterBrand();
  },[])

  const handleApplyFilters = () => {
    // You can pass the selected filters to your parent component for further processing
    applyFilter({
      brand:selectedBrand,
      category:selectedCategory,
      minPrice:minPrice,
      maxPrice:maxPrice
    })
  };

  return (
    <div className="mb-5">
      {isFilterOpen && (
        <div className="flex space-x-4 items-end">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              className="block w-full border border-gray-300 rounded p-2"

              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}            >
              <option value="">All Brands</option>
              {brands?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              placeholder="Min"
              className="block w-full border border-gray-300 rounded p-2"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              placeholder="Max"
              className="block w-full border border-gray-300 rounded p-2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
