"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiListCheck2 } from "@remixicon/react";
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components";
import styles from "./product-filter-modal.module.css";

// Get the query params from the URL and create a <button> for each query param. 
// when the button is clicked, it should remove the query param from the URL and filter the products.
// The button should contain the text for the query param and a close icon.
export default function ProductFilterModal() {
  const [open, setOpen] = useState(false);
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
        <div className={styles["product-filter-modal-dialog"]}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader
                title="Filters Products"
                description="Filter products by category and price"
                onClick={() => setOpen(false)}
              />
              <ModalBody>
                <div>Checkboxes and other filters go here</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={async () => {
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
