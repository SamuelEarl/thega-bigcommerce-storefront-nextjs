"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RiCloseLine } from "@remixicon/react";
import "./product-filter-tags.css";

// Get the query params from the URL and create a <button> for each query param. 
// when the button is clicked, it should remove the query param from the URL and filter the products.
// The button should contain the text for the query param and a close icon.
export default function ProductFilterTags() {
  const searchParams = useSearchParams();
  // This helper function takes a word and returns a formatted string by replacing "-" with a space and capitalizing the first letter of each word.
  function formatQueryParam(word: string): string {
    return word
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  console.log("SHIRTS & TOPS:", formatQueryParam("shirts-&-tops"));

  return (
    <div className="product-filter-tags-container">
      {/* Loop over the query params and create a <button> for each query param. */}
      {Array.from(searchParams.entries()).map(([key, value]) => (
        <button
          key={key}
          className="filter-tag"
          onClick={() => {
            // Remove the query param from the URL and filter the products.
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete(key);
            const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
            window.history.pushState({}, "", newUrl);
          }}
        >
          {/* {key} : {value} */}
          {formatQueryParam(value)}
          <RiCloseLine size={20} />
        </button>
      ))}
    </div>
  )
}
