import Image from "next/image";
import { Suspense } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { DrillDownNav } from "./drill-down-nav";
import ProductFilterTags from "./product-filter-tags";
import ProductFilterModal from "./product-filter-modal";
import styles from "./page.module.css";

export type FacetObj = {
  name: string;
  value: string;
};

export type FacetCollection = {
  audience: FacetObj[];
  shoes: FacetObj[];
  clothing: FacetObj[];
  accessories: FacetObj[];
  sport: FacetObj[];
};

async function getAllFacets() {
  // // Get all of the product facets from the database.
  // const response = await fetch("/api/facets");
  // const data = await response.json();
  // return data;

  const facets: FacetCollection = {
    color: [
      {
        name: "Black",
        value: "&color=black",
      },
      {
        name: "White",
        value: "&color=white",
      },
      {
        name: "Blue",
        value: "&color=blue",
      },
      {
        name: "Green",
        value: "&color=green",
      },
      {
        name: "Orange",
        value: "&color=orange",
      },
      {
        name: "Pink",
        value: "&color=pink",
      },
      {
        name: "Purple",
        value: "&color=purple",
      },
      {
        name: "Red",
        value: "&color=red",
      },
      {
        name: "Yellow",
        value: "&color=yellow",
      },
    ],
    size: [
      {
        name: "XS",
        value: "&size=xs",
      },
      {
        name: "S",
        value: "&size=s",
      },
      {
        name: "M",
        value: "&size=m",
      },
      {
        name: "L",
        value: "&size=l",
      },
      {
        name: "XL",
        value: "&size=xl",
      },
    ],
  };

  return facets;
}

interface ShopProps {
  params: Promise<{
    shopSegments: string[];
  }>;
}

export default async function Shop({ params }: ShopProps) {
  // Get all of the product facets from the database.
  const facets = await getAllFacets();

  // Await the params object in Next.js App Router.
  const resolvedParams = await params;
  const segments = resolvedParams.shopSegments;

  return (
    <div className="shop">
      <div className={styles["shop-header"]}>
        <div className={styles["on-page-nav-group"]}>
          <Breadcrumbs />
          <DrillDownNav />
        </div>
        <div className={styles["product-filters-container"]}>
          <ProductFilterModal facets={facets} />
        </div>
        {/* <div>
          {segments?.length > 0 && <Suspense fallback={<div>Updating filters...</div>}>
            <ProductFilterTags />
          </Suspense>}
          <Suspense fallback={<div>Updating filters...</div>}>
            <ProductFilterTags />
          </Suspense>
        </div> */}
      </div>
      <div className={styles["shop-body"]}>
        <h2>
          {segments?.length > 0 && segments.map((segment, index) => (
            <span>{segment} </span>
            // <div key={index}>Segment {index + 1}: {segment}</div>
          ))}
        </h2>
      </div>
    </div>
  )
}
