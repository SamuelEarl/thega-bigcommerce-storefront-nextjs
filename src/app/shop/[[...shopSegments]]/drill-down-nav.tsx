"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { topNav, type IAudience, type ICategory, type ISport, type IProductType } from "@/navigation";
import styles from "./drill-down-nav.module.css";

interface DrillDownLink {
  text: string;
  path: string;
}

type NavNode = IAudience | ICategory | ISport | IProductType;

/**
 * Filters out "all" navTypes and maps to DrillDownLink format.
 */
function filterAndMapChildren(items: NavNode[]): DrillDownLink[] {
  return items
    .filter(item => !item.navType.startsWith("all"))
    .map(item => ({
      text: item.text,
      path: item.path,
    }));
}

/**
 * Recursively searches nav items to find the one matching the target path.
 */
function findNavItem(items: NavNode[], targetPath: string): NavNode | null {
  for (const item of items) {
    if (item.path === targetPath) {
      return item;
    }

    if ("subnav" in item && item.subnav) {
      const found = findNavItem(item.subnav, targetPath);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Finds the direct children of the current path.
 * Returns null if no children exist or all children are filtered out.
 */
function findDirectChildren(targetPath: string): DrillDownLink[] | null {
  const nav = topNav();

  // Determine which items to use as children
  let childItems: NavNode[] | undefined;

  if (targetPath === "/shop") {
    childItems = nav;
  }
  else {
    const currentItem = findNavItem(nav, targetPath);
    childItems = currentItem && "subnav" in currentItem ? currentItem.subnav : undefined;
  }

  if (!childItems) {
    return null;
  }

  const children = filterAndMapChildren(childItems);
  return children.length > 0 ? children : null;
}

export function DrillDownNav() {
  const currentPath = usePathname();
  const children = findDirectChildren(currentPath);

  if (!children) {
    return null;
  }

  return (
    <nav aria-label="Drill-down navigation" className={styles["drill-down-nav"]}>
      <div className={styles["drill-down-heading"]}>Browse for:</div>
      <ul className={styles["drill-down-list"]}>
        {children.map((child) => (
          <li key={child.path} className={styles["drill-down-item"]}>
            <Link href={child.path} className={styles["drill-down-item-link"]}>{child.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
