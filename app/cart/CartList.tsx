"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface iCart{
    id:string,userId:string
}

export default function CartList() {
  const [cart, setCart] = useState<iCart[]>([]);
  const { push } = useRouter();

  const getCart = useCallback(async () => {
    try {
      const res = await fetch(`https://dummyjson.com/carts${`?limit=0`}`, {
        next: {
          // 0 so the data will refetch and will not use the cache
          revalidate: 0,
        },
      });
      const data = await res.json();
      setCart(data?.carts);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleCartDetail =(id:string)=>{
    console.log('asd')
    push(`/cart/${id}`)
  }

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
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
            <tr  className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 w-[20%] text-left">Cart Id</th>
              <th className="py-3 px-6 w-[20%] text-center">Cart User Id</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cart?.map((cart, index) => (
              <tr
              onClick={()=>handleCartDetail(cart?.userId)}
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{cart?.id}</td>
                <td className="py-3 px-6 text-center">{cart?.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
