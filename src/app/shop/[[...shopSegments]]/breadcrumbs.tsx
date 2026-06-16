"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { topNav } from "@/navigation";
import styles from "./breadcrumbs.module.css";

interface BreadcrumbItem {
  text: string;
  path: string;
}

/**
 * Finds the breadcrumb trail for a given path.
 * 
 * @param targetPath The path to find the breadcrumb trail for.
 * @returns An array of breadcrumb items.
 */
function findPath(targetPath: string): BreadcrumbItem[] | null {
  const nav = topNav();

  // Search through audience -> category -> productType hierarchy
  for (const [audienceKey, audienceObj] of Object.entries(nav.audience)) {
    // Check if audience path matches
    if (audienceObj.path === targetPath) {
      return [{ text: audienceObj.text, path: audienceObj.path }];
    }

    // Search categories
    for (const [categoryKey, categoryObj] of Object.entries(audienceObj.category)) {
      // Check if category path matches
      if (categoryObj.path === targetPath) {
        return [
          { text: audienceObj.text, path: audienceObj.path },
          { text: categoryObj.text, path: categoryObj.path },
        ];
      }

      // Search productTypes if they exist
      if (categoryObj.productType) {
        for (const [productTypeKey, productTypeObj] of Object.entries(categoryObj.productType)) {
          // Check if productType path matches
          if (productTypeObj.path === targetPath) {
            return [
              { text: audienceObj.text, path: audienceObj.path },
              { text: categoryObj.text, path: categoryObj.path },
              { text: productTypeObj.text, path: productTypeObj.path },
            ];
          }
        }
      }
    }
  }
  return null;
}

export function Breadcrumbs() {
  const currentPath = usePathname();

  // Find the trail of nav items leading to the current route.
  const pathTrail = findPath(currentPath) || [];

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles["breadcrumbs-list"]}>
        {/* Hardcoded Home link */}
        <li className={styles["breadcrumb-item"]}>
          {currentPath === "/shop" ? (
            <span className={styles["current-route"]}>Shop Home</span>
          ) : (
            <>
              <Link href="/shop" className={styles["breadcrumb-item-link"]}>Shop Home</Link>
              <span className={styles["separator"]}> / </span>
            </>
          )}
        </li>

        {pathTrail.map((item, i) => {
          const isLast = i === pathTrail.length - 1;
          return (
            <li key={item.text} className={styles["breadcrumb-item"]}>
              {isLast ? (
                <span className={styles["current-route"]}>{item.text}</span>
              ) : (
                <>
                  <Link href={item.path!} className={styles["breadcrumb-item-link"]}>{item.text}</Link>
                  <span className={styles["separator"]}> / </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
