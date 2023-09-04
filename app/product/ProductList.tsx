import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Pagination from "../components/Pagination";
import SearchProduct from "./SearchProduct";
import FilterProduct from "./FilterProduct";
import Echart from "../chart/Echart";
import ProductChart from "./ProductChart";
import Image from "next/image";

export interface iProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  quantity?:number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface iPaginationConfig {
  page: number;
  pageSize: number;
  totalPage: number;
}

export default function ProductList() {
  const [pagination, setPagination] = useState<iPaginationConfig>({
    page: 1,
    pageSize: 5,
    totalPage: 0,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [product, setProduct] = useState<iProduct[]>([]);
  const [filteredProduct, setfilteredProduct] = useState<iProduct[]>([]);
  const [filteredProductFilter, setfilteredProductFilter] = useState<
    iProduct[]
  >([]);
  const handlePaginate = (i: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: i,
    }));
  };

  const getProduct = useCallback(async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products${`?limit=0`}`, {
        next: {
          // 0 so the data will refetch and will not use the cache
          revalidate: 0,
        },
      });
      const data = await res.json();
      localStorage.setItem("product", JSON.stringify(data?.products));
      setProduct(data?.products);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const temp =
      filteredProductFilter.length > 0
        ? [...filteredProductFilter]
        : [...product];
    setfilteredProduct(
      temp?.slice(
        pagination.page - 1,
        pagination?.pageSize - 1 + pagination?.page
      )
    );
    setPagination((prev) => {
      return {
        ...prev,
        totalPage: Math.ceil(
          filteredProductFilter.length > 0
            ? filteredProductFilter.length / pagination?.pageSize
            : product.length / pagination?.pageSize
        ),
      };
    });
  }, [pagination.page, pagination?.pageSize, product, filteredProductFilter]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchProduct = (search?: string) => {
    const temp = [...product];
    setfilteredProduct(
      temp?.filter((e) => {
        return e?.title.includes(search as string);
      })
    );
  };

  const applyFilter = (filter: any) => {
    const temp = [...product];
    const filteredProducts = temp.filter((product) => {
      return (
        (!filter?.brand || product.brand === filter?.brand) &&
        (!filter?.category || product.category === filter?.category) &&
        (!filter?.minPrice || product.price >= filter?.minPrice) &&
        (!filter?.maxPrice || product.price <= filter?.maxPrice)
      );
    });
    setfilteredProductFilter(filteredProducts);
  };

  useEffect(() => {
    if (!localStorage.getItem("product")) {
      getProduct();
    } else {
      const prod = localStorage.getItem("product");
      // console.log(JSON.parse(prod as string))
      setProduct(JSON.parse(prod as string));
    }
  }, [getProduct]);

  const ChartProduct = useMemo(() => {
    return <ProductChart product={product} />;
  }, [product]);
  return (
    <>
      <div className="flex gap-2 mb-4">
        <SearchProduct getProduct={handleSearchProduct} />
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={toggleFilter}
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      <FilterProduct applyFilter={applyFilter} isFilterOpen={isFilterOpen} />
      <div
        style={{
          minHeight: "10rem",
          marginBottom: "1rem",
        }}
      >
        <div className="relative overflow-x-auto">
          <table
            className="min-w-full h-100 bg-white border table-fixed border-gray-300 overflow-x-auto"
            style={{
              overflowX: "auto",
            }}
          >
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 w-[20%] text-left">Product Name</th>
                <th className="py-3 px-6 w-[20%] text-center">Brand</th>
                <th className="py-3 px-6 w-[20%] text-center">Price</th>
                <th className="py-3 px-6 w-[20%] text-center">Stock</th>
                <th className="py-3 px-6 w-[20%] text-center">Category</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredProduct?.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{product.title}</td>
                  <td className="py-3 px-6 text-center">{product.brand}</td>
                  <td className="py-3 px-6 text-center">{product.price}</td>
                  <td className="py-3 px-6 text-center">{product.stock}</td>
                  <td className="py-3 px-6 text-center">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination handleClick={handlePaginate} config={pagination} />
      {ChartProduct}
    </>
  );
}
