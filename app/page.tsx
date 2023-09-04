"use client";
import { useEffect, useState } from "react";
import ProductList from "./product/ProductList";

export default function Product() {
  return (
    <div className="container mx-auto p-5">
      <h1>Product</h1>
      <ProductList />
    </div>
  );
}
