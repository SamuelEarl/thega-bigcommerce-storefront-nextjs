"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiListCheck2 } from "@remixicon/react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import styles from "./product-filter-modal.module.css";

// Get the query params from the URL and create a <button> for each query param. 
// when the button is clicked, it should remove the query param from the URL and filter the products.
// The button should contain the text for the query param and a close icon.
export default function ProductFilterModal() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <Dialog>
      <DialogTrigger className={styles["product-filter-modal-button"]}>
        Filters
        <RiListCheck2 size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <>
  //     <div className={styles["product-filter-modal"]}>
  //       <Button className={styles["product-filter-modal-button"]}>
  //         Filters
  //         <RiListCheck2 size={20} />
  //       </Button>
  //     </div>

  //     <div className={styles["product-filter-modal-dialog"]}>
  //       <div>

  //       </div>
  //     </div>
  //   </>
  // )
}
