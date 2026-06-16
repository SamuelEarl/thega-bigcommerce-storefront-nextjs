"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { topNav } from "@/navigation";
import styles from "./drill-down-nav.module.css";

interface DrillDownLink {
  text: string;
  path: string;
}

interface DrillDownData {
  heading: string;
  children: DrillDownLink[];
}

/**
 * Finds the direct children of the current path and returns a heading based on the child level type.
 * Returns null if no children exist (leaf node).
 * Filters out items with the key "all".
 */
function findDirectChildren(targetPath: string): DrillDownData | null {
  const nav = topNav();

  // If at /shop root, show audiences (filter out "all")
  if (targetPath === "/shop") {
    return {
      heading: "Audience",
      children: Object.entries(nav.audience)
        .filter(([key]) => key !== "all")
        .map(([, audienceObj]) => ({
          text: audienceObj.text,
          path: audienceObj.path,
        })),
    };
  }

  // Search through audience -> category -> productType hierarchy
  for (const audienceObj of Object.values(nav.audience)) {
    // If current path matches an audience, return its categories (filter out "all")
    if (audienceObj.path === targetPath) {
      return {
        heading: "Category",
        children: Object.entries(audienceObj.category)
          .filter(([key]) => key !== "all")
          .map(([, categoryObj]) => ({
            text: categoryObj.text,
            path: categoryObj.path,
          })),
      };
    }

    // Search categories
    for (const categoryObj of Object.values(audienceObj.category)) {
      // If current path matches a category, return its productTypes (filter out "all")
      if (categoryObj.path === targetPath) {
        if (categoryObj.productType) {
          return {
            heading: "Product Type",
            children: Object.entries(categoryObj.productType)
              .filter(([key]) => key !== "all")
              .map(([, productTypeObj]) => ({
                text: productTypeObj.text,
                path: productTypeObj.path,
              })),
          };
        }
        return null; // No children
      }

      // Check productTypes (leaf nodes - no children to return)
      if (categoryObj.productType) {
        for (const productTypeObj of Object.values(categoryObj.productType)) {
          if (productTypeObj.path === targetPath) {
            return null; // Leaf node, no children
          }
        }
      }
    }
  }
  return null;
}

export function DrillDownNav() {
  const currentPath = usePathname();
  const drillDownData = findDirectChildren(currentPath);

  // Don't render if no children exist
  if (!drillDownData || drillDownData.children.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Drill-down navigation" className={styles["drill-down-nav"]}>
      {/* <div className={styles["drill-down-heading"]}>{drillDownData.heading}:</div> */}
      <div className={styles["drill-down-heading"]}>Browse for:</div>
      <ul className={styles["drill-down-list"]}>
        {drillDownData.children.map((child) => (
          <li key={child.path} className={styles["drill-down-item"]}>
            <Link href={child.path} className={styles["drill-down-item-link"]}>{child.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
