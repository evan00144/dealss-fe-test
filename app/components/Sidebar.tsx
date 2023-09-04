import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <nav className="w-64 sidebar h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Admin</h2>
      <ul>
        <li className="mb-2">
          <Link href="/">
            <p className="text-blue-500 hover:text-blue-700">Home</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/cart">
            <p className="text-blue-500 hover:text-blue-700">Cart</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
