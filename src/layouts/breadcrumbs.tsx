"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, combinedNav } from "@/navigation";
import "./breadcrumbs.css";

function findPath(items: NavItem[], targetPath: string): NavItem[] | null {
  for (const item of items) {
    // Check if this item is the target
    if (item.path === targetPath) {
      return [item];
    }

    // If not, check its subnav recursively
    if (item.subnav) {
      const path = findPath(item.subnav, targetPath);
      if (path) {
        // Prepend current item to the path found in children
        return [item, ...path];
      }
    }
  }
  return null;
}

export function Breadcrumbs() {
  const currentPath = usePathname();
  const navItems = combinedNav();

  // Find the trail of NavItems leading to the current route
  const pathTrail = findPath(navItems, currentPath) || [];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {/* Hardcoded Home link */}
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
          {currentPath !== "/" && <span className="separator"> / </span>}
        </li>

        {pathTrail.map((item, i) => {
          const isLast = i === pathTrail.length - 1;
          return (
            <li key={item.text} className="breadcrumb-item">
              {isLast ? (
                <span className="current-route">{item.text}</span>
              ) : (
                <>
                  <Link href={item.path!}>{item.text}</Link>
                  <span className="separator"> / </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
