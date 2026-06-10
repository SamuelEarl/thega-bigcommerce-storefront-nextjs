"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RiListCheck2 } from "@remixicon/react";
import "./product-filter-modal.css";

// Get the query params from the URL and create a <button> for each query param. 
// when the button is clicked, it should remove the query param from the URL and filter the products.
// The button should contain the text for the query param and a close icon.
export default function ProductFilterModal() {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="product-filter-modal">
        <button className="product-filter-modal-button">
          Filters
          <RiListCheck2 size={20} />
        </button>
      </div>

      <div className="product-filter-modal-dialog">
        <div>

        </div>
      </div>
    </>
  )
}
