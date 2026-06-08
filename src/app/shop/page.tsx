import Image from "next/image";
import { Suspense } from "react";
import FilterTags from "./filter-tags";
// import "./shop.css";

export default function Shop() {
  return (
    <div className="shop">
      <h1>Shop</h1>
      <Suspense fallback={<div>Updating filters...</div>}>
        <FilterTags />
      </Suspense>
    </div>
  )
}
