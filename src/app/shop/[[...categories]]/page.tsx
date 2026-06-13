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
  sport: FacetObj[];
};

async function getAllFacets() {
  // // Get all of the product facets from the database.
  // const response = await fetch("/api/facets");
  // const data = await response.json();
  // return data;

  const facets: FacetCollection = {
    audience: [
      {
        name: "Men",
        value: "&audience=men",
      },
      {
        name: "Women",
        value: "&audience=women",
      },
    ],
    shoes: [
      {
        name: "Running",
        value: "&category=shoes&sport=running",
      },
      {
        name: "Basketball",
        value: "&category=shoes&sport=basketball",
      },
      {
        name: "Soccer",
        value: "&category=shoes&sport=soccer",
      },
      {
        name: "Tennis",
        value: "&category=shoes&sport=tennis",
      },
    ],
    clothing: [
      {
        name: "Pants",
        value: "&category=clothing-pants",
      },
      {
        name: "Shorts",
        value: "&category=clothing-shorts",
      },
      {
        name: "Shirts & Tops",
        value: "&category=clothing-shirts_and_tops",
      },
    ],
    accessories: [
      {
        name: "Hats",
        value: "&category=accessories-hats",
      },
      {
        name: "Socks",
        value: "&category=accessories-socks",
      },
      {
        name: "Belts",
        value: "&category=accessories-belts",
      }
    ],
    sport: [
      {
        name: "Running",
        value: "&sport=running",
      },
      {
        name: "Basketball",
        value: "&sport=basketball",
      },
      {
        name: "Soccer",
        value: "&sport=soccer",
      },
      {
        name: "Tennis",
        value: "&sport=tennis",
      },
    ],
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
