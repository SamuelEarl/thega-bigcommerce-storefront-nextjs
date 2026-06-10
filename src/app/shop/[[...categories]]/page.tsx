import Image from "next/image";
import { Suspense } from "react";
import ProductFilterTags from "./product-filter-tags";
import ProductFilterModal from "./product-filter-modal";
import styles from "./page.module.css";

interface ShopProps {
  params: Promise<{
    categories: string[];
  }>;
}

export default async function Shop({ params }: ShopProps) {
  // Await the params object in Next.js App Router
  const resolvedParams = await params;
  const segments = resolvedParams.categories;

  return (
    <div className="shop">
      <div className="shop-header">
        <div className={styles["product-filters-container"]}>
          <ProductFilterModal />
        </div>
        <div>
          {/* {segments?.length > 0 && <Suspense fallback={<div>Updating filters...</div>}>
            <ProductFilterTags />
          </Suspense>} */}
          <Suspense fallback={<div>Updating filters...</div>}>
            <ProductFilterTags />
          </Suspense>
        </div>
      </div>
      {/* {segments.map((segment, index) => (
        <div key={index}>Segment {index + 1}: {segment}</div>
      ))} */}
    </div>
  )
}
