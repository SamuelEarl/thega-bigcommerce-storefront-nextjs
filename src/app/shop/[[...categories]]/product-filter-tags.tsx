"use client";

import { useSearchParams } from "next/navigation";
import { RiCloseLine } from "@remixicon/react";
import styles from "./product-filter-tags.module.css";

// Get the query params from the URL and create a <button> for each query param. 
// when the button is clicked, it should remove the query param from the URL and filter the products.
// The button should contain the text for the query param and a close icon.
export default function ProductFilterTags() {
  const searchParams = useSearchParams();

  // This helper function takes a word and returns a formatted string.
  function formatQueryParam(word: string): string {
    return word
      .replace(/-/g, " : ") // replace "-" with a " : "
      .replace(/_/g, " ") // replace "_" with a " "
      .replace(/and/g, "&") // replace "and" with a "&"
      .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize the first letter of each word
  }

  // Create a stable array of params sorted by key to avoid hydration mismatches
  const params = Array.from(searchParams.entries()).sort(([keyA, valueA], [keyB, valueB]) => {
    const keyCompare = keyA.localeCompare(keyB);
    return keyCompare !== 0 ? keyCompare : valueA.localeCompare(valueB);
  });

  return (
    <div className={styles["product-filter-tags-container"]}>
      {/* Loop over the sorted query params and create a <button> for each query param. */}
      {params.map(([key, value], index) => (
        <button
          key={`${key}-${value}-${index}`}
          className={styles["filter-tag"]}
          onClick={() => {
            // Remove this specific query param from the URL
            const newSearchParams = new URLSearchParams(searchParams);
            // Get all values for this key
            const allValues = newSearchParams.getAll(key);
            // Remove all values for this key
            newSearchParams.delete(key);
            // Re-add all values except the one we're removing
            allValues.forEach(v => {
              if (v !== value) {
                newSearchParams.append(key, v);
              }
            });
            const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
            window.history.pushState({}, "", newUrl);
          }}
        >
          {formatQueryParam(value)}
          <RiCloseLine size={20} />
        </button>
      ))}
    </div>
  )
}
