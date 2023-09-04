"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { iProduct } from "../../product/ProductList";



interface iCartDetail {
  id: number;
  products: iProduct[];
  total: number;
  discountedTotal: number;
  userId: number; 
  totalProducts: number;
  totalQuantity: number;
}

export default function CartDetail() {
  const [cartData, setCartData] = useState<iCartDetail>();
  const {idUser} = useParams();
  useEffect(() => {
    // Fetch user's cart data from the API
    fetch(`https://dummyjson.com/carts/user/${idUser}`)
      .then((response) => response.json())
      .then((data) => setCartData(data?.carts[0]));
  }, [idUser]);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Cart Detail</h2>
      <div className="mb-4">
        <strong>User ID:</strong> {cartData.userId}
      </div>
      <table
        className="min-w-full bg-white border table-fixed border-gray-300 overflow-x-auto"
        style={{ overflowX: "auto" }}
      >
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 w-[20%] text-left">Product Name</th>
            <th className="py-3 px-6 w-[20%] text-center">Price</th>
            <th className="py-3 px-6 w-[20%] text-center">Quantity</th>
            <th className="py-3 px-6 w-[20%] text-center">Total Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {cartData.products.map((product, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{product.title}</td>
              <td className="py-3 px-6 text-center">{product.price}</td>
              <td className="py-3 px-6 text-center">{product.quantity}</td>
              <td className="py-3 px-6 text-center">{product.quantity as number * product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
