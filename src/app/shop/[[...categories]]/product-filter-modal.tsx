"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiListCheck2 } from "@remixicon/react";
import {
  Button,
  Checkbox,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components";
import styles from "./product-filter-modal.module.css";
import type { FacetCollection, FacetObj } from "./page";

export default function ProductFilterModal({ facets }: { facets: FacetCollection }) {
  const [open, setOpen] = useState(false);
  // A string that contains the facets that the user has selected for filtering. Each key-value pair in the string will be a search param in the URL.
  const [selectedFacets, setSelectedFacets] = useState<string>("");

  const searchParams = useSearchParams();

  return (
    <>
      <div className={styles["product-filter-modal"]}>
        <Button
          className={styles["product-filter-modal-button"]}
          onClick={() => setOpen(true)}
        >
          Filters
          <RiListCheck2 size={20} />
        </Button>
      </div>

      {open && (
        <div className={styles["product-filter-modal-dialog"]} data-state={open ? "open" : "closed"}>
          <ModalOverlay isOpen={open}>
            <ModalContent>
              <ModalHeader
                title="Filter Products"
                onClick={() => setOpen(false)}
              />
              <ModalBody>
                {
                  // TODO: The URL will act as the single source of truth for the checkbox states. So I need to create the checkboxes based on the `facets` data and set their state based on the `searchParams`.
                  // Each of the search params needs to be created as an array of values in the URL because a user could select multiple values under the same category.
                  Object.entries(facets).map(([facetKey, facetArray]) => {
                    return (
                      <fieldset key={facetKey} className={styles["filter-fieldset"]}>
                        <legend className={styles["filter-legend"]}>{facetKey.toUpperCase()}</legend>
                        {
                          facetArray.map((facetObj: FacetObj) => {
                            // Create checkboxes for each facet.
                            // "audience" checkboxes will create a single search param in the URL, for example: "audience=men", "audience=women"
                            // "sport" checkboxes will create a single search param in the URL, for example: "sport=running", "sport=tennis"
                            // "shoes" checkboxes will create two search params in the URL, for example: "category=shoes&sport=running"
                            // "clothing" and "accessories" checkboxes will create a single search param in the URL for each category/subcategory pair. If there are multiple keys with the same facet key (e.g. category), then they will be treated as an array of values, for example: "category=clothing-pants&category=clothing-shorts"
                            return (
                              <Checkbox
                                key={`${facetKey}-${facetObj.value}`}
                                name={facetObj.name}
                                value={facetObj.value}
                                // TODO: Set the value of each checkbox based on the search params in the URL.
                                checked={searchParams.get(facetKey) === [...facetObj.value].join("&")}
                                onChange={(e) => {
                                  console.log("Checkbox clicked:", e.target.checked);
                                  const facetValueString = facetObj.value;
                                  // If the user adds a facet, then concatenate it to the end of the `selectedFacets` string.
                                  if (e.target.checked) {
                                    setSelectedFacets((prev) => {
                                      const newValue = prev.concat(facetValueString);
                                      console.log("selectedFacets (new):", newValue);
                                      return newValue;
                                    });
                                  }
                                  // If the user removes a facet, remove only the first instance from the `selectedFacets` string.
                                  // The "Apply" button logic will handle the rest, including using Set() to remove duplicates.
                                  else {
                                    setSelectedFacets((prev) => {
                                      const result = prev.replace(facetValueString, "");
                                      console.log("selectedFacets (new):", result);
                                      return result;
                                    });
                                  }
                                  // navigate(`/shop?${newSearchParams.toString()}`);
                                }}
                              >
                                {facetObj.name}
                              </Checkbox>
                            );
                          })
                        }
                      </fieldset>
                    );
                  })
                }
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={async () => {
                    // Convert the `selectedFacets` string into search parameters in the URL.
                    // Remove the leading '&' from the `selectedFacets` string.
                    const cleanedFacetsString = selectedFacets.slice(1);
                    const newSearchParams = new URLSearchParams(cleanedFacetsString);
                    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
                    window.history.pushState({}, "", newUrl);
                    // Send the facet filters to the backend and update the displayed products.
                    // await applyFilters();
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
                <Button onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </div >
      )}
    </>
  )
}
