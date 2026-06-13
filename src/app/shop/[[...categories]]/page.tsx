import Image from "next/image";
import { Suspense } from "react";
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
  sports: FacetObj[];
};

async function getAllFacets() {
  // // Get all of the product facets from the database.
  // const response = await fetch("/api/facets");
  // const data = await response.json();
  // return data;
  const sports = [
    {
      name: "Running",
      value: "running",
    },
    {
      name: "Basketball",
      value: "basketball",
    },
    {
      name: "Soccer",
      value: "soccer",
    },
    {
      name: "Tennis",
      value: "tennis",
    },
  ];

  const facets: FacetCollection = {
    audience: [
      {
        name: "Men",
        value: "men",
      },
      {
        name: "Women",
        value: "women",
      },
    ],
    shoes: sports,
    clothing: [
      {
        name: "Pants",
        value: "pants",
      },
      {
        name: "Shorts",
        value: "shorts",
      },
      {
        name: "Shirts & Tops",
        value: "shirts-and-tops",
      },
    ],
    accessories: [
      {
        name: "Hats",
        value: "hats",
      },
      {
        name: "Socks",
        value: "socks",
      },
      {
        name: "Belts",
        value: "belts",
      }
    ],
    sports: sports,
  };

  return facets;
}

interface ShopProps {
  params: Promise<{
    categories: string[];
  }>;
}

export default async function Shop({ params }: ShopProps) {
  // Get all of the product facets from the database.
  const facets = await getAllFacets();

  // Await the params object in Next.js App Router
  const resolvedParams = await params;
  const segments = resolvedParams.categories;

  return (
    <div className="shop">
      <div className="shop-header">
        <div className={styles["product-filters-container"]}>
          <ProductFilterModal facets={facets} />
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
