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
  // An array of facet objects, each object representing a facet key and its values.
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string>[]>([]);

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
                  // The URL will act as the single source of truth for the checkbox states. So I need to create the checkboxes based on the `facets` data and set their state based on the `searchParams`.
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
                            // "clothing" and "accessories" checkboxes will create a single search param in the URL for each category/subcategory pair. If there are multiple keys with the same facet key (e.g. category), then they will be treated as an array of values, for example: "category=clothing:pants&category=clothing:shorts"
                            return (
                              <Checkbox
                                key={`${facetKey}-${facetObj.value}`}
                                name={facetObj.name}
                                value={facetObj.value}
                                checked={searchParams.get(facetKey) === facetObj.value}
                                onChange={(e) => {
                                  console.log("Checkbox clicked:", e.target.checked);
                                  const lowerCaseFacetKey = facetKey.toLowerCase();
                                  const lowerCaseFacetValue = facetObj.value.toLowerCase();
                                  // Check if the facet key/value pair already exists in the `selectedFacets` array.
                                  const facetExists = selectedFacets.findIndex((facet) => facet[lowerCaseFacetKey] === lowerCaseFacetValue);
                                  // If the facet already exsists, then remove it.
                                  if (facetExists > -1) {
                                    setSelectedFacets((prev) => {
                                      const newValue = prev.filter((facet) => facet[lowerCaseFacetKey] !== lowerCaseFacetValue)
                                      // console.log("selectedFacets (new):", newValue);
                                      return newValue
                                    });
                                  }
                                  // Otherwise, add the facet key/value pair to the `selectedFacets` array.
                                  else {
                                    setSelectedFacets((prev) => {
                                      const newValue = [...prev, { [lowerCaseFacetKey]: lowerCaseFacetValue }];
                                      // console.log("selectedFacets (new):", newValue);
                                      return newValue;
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
                  //   // Loop over facet categories (e.g. shoes, clothing, accessories)
                  //   else if (facetKey === "categories") {
                  //     return facetArray.map((facetObj: FacetObj) => {
                  //       const subcategories = facetObj.subcategories;
                  //       return (
                  //         <fieldset key={facetObj.value} className={styles["filter-fieldset"]}>
                  //           <legend className={styles["filter-legend"]}>{facetObj.name.toUpperCase()}</legend>
                  //           {
                  //             subcategories && subcategories.map((subcategory: FacetObj) => {
                  //               // Create checkboxes for each sport within the "Shoes" category. These checkboxes will create two search params in the URL, for example: "category=shoes&sport=running"
                  //               // Create checkboxes for each subcategory. These checkboxes will create a single search param in the URL with an array value, for example: "category=clothing:pants&category=clothing:shorts"
                  //               return (
                  //                 <Checkbox
                  //                   key={`${facetKey}-${subcategory.value}`}
                  //                   name={subcategory.name}
                  //                   value={subcategory.value}
                  //                   checked={searchParams.get(facetKey) === subcategory.value}
                  //                   onChange={(e) => {
                  //                     console.log("Checkbox clicked:", e.target.checked);
                  //                     const lowerCaseFacetKey = facetKey.toLowerCase();
                  //                     const lowerCaseFacetValue = facetObj.value.toLowerCase();
                  //                     // Check if the facet key/value pair already exists in the `selectedFacets` array.
                  //                     const facetExists = selectedFacets.findIndex((facet) => facet[lowerCaseFacetKey] === lowerCaseFacetValue);
                  //                     // If the facet already exsists, then remove it.
                  //                     if (facetExists > -1) {
                  //                       setSelectedFacets((prev) => {
                  //                         const newValue = prev.filter((facet) => facet[lowerCaseFacetKey] !== lowerCaseFacetValue)
                  //                         // console.log("selectedFacets (new):", newValue);
                  //                         return newValue
                  //                       });
                  //                     }
                  //                     // Otherwise, add the facet key/value pair to the `selectedFacets` array.
                  //                     else {
                  //                       setSelectedFacets((prev) => {
                  //                         const newValue = [...prev, { [lowerCaseFacetKey]: lowerCaseFacetValue }];
                  //                         // console.log("selectedFacets (new):", newValue);
                  //                         return newValue;
                  //                       });
                  //                     }
                  //                     // navigate(`/shop?${newSearchParams.toString()}`);
                  //                   }}
                  //                 >
                  //                   {subcategory.name}
                  //                 </Checkbox>
                  //               );
                  //             })
                  //           }
                  //         </fieldset>
                  //       );
                  //     })
                  //   }
                  // })
                }
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={async () => {
                    // Convert the `selectedFacets` array into search parameters in the URL. 
                    // const newSearchParams = new URLSearchParams(searchParams);
                    // if (e.target.checked) {
                    //   newSearchParams.set(facetKey, facetObj.value);
                    // } 
                    // else {
                    //   newSearchParams.delete(facetKey);
                    // }
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
        </div>
      )}
    </>
  )
}
