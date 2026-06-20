"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, type INavItem } from "@/navigation";
import styles from "./breadcrumbs.module.css";

interface BreadcrumbItem {
  text: string;
  path: string;
}

/**
 * Recursively searches through nav items to find the breadcrumb trail for a given path.
 *
 * @param items Array of navigation items to search
 * @param targetPath The path to find
 * @returns Array of breadcrumb items representing the trail, or null if not found
 */
function searchNavItems(items: INavItem[], targetPath: string): BreadcrumbItem[] | null {
  for (const item of items) {
    // Check if this item matches the target path
    if (item.path === targetPath) {
      return [{ text: item.text, path: item.path }];
    }

    // Recursively search subnav if it exists (IProductType doesn't have subnav)
    if ("subnav" in item && item.subnav && item.subnav.length > 0) {
      const subPath = searchNavItems(item.subnav, targetPath);
      if (subPath) {
        // Prepend current item to the path found in children
        return [{ text: item.text, path: item.path }, ...subPath];
      }
    }
  }
  return null;
}

/**
 * Finds the breadcrumb trail for a given path.
 *
 * @param targetPath The path to find the breadcrumb trail for.
 * @returns An array of breadcrumb items.
 */
function findPath(targetPath: string): BreadcrumbItem[] | null {
  const nav = mainNav();
  return searchNavItems(nav, targetPath);
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
