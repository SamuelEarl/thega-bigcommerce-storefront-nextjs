import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiSearchLine,
  RiShoppingBagLine,
  RiUserLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import Logo from "@/../public/images/logo-and-name-horizontal-white-fbfbfb.svg";
import { iconNav, NavItem, topNav } from "@/navigation";
import styles from "./header-desktop.module.css";

// Icon mapping
const iconMap: Record<string, RemixiconComponentType> = {
  "search-line": RiSearchLine,
  "shopping-bag-line": RiShoppingBagLine,
  "user-line": RiUserLine,
};

export default function HeaderDesktop() {
  // Track which mega menu is open by nav item text. null = all closed.
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Find the active nav item's subnav data for the mega menu.
  const activeSubnav = topNav()
    .find((item: NavItem) => item.text === activeMegaMenu)
    ?.subnav ?? null;

  return (
    <div className={styles["header-desktop-content"]}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <Image
            src={Logo}
            height={40}
            className={styles["logo"]}
            alt="THEGA logo"
            loading="eager"
          />
        </Link>
      </div>

      {/* Wrap nav + mega menu so mouseleave only fires when leaving the entire area. */}
      <nav
        className={styles["desktop-top-nav"]}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        {/* The top-level navigation items that appear in the header (above the mega menu). */}
        <ul className={`${styles["nav-list"]} ${styles["desktop-top-nav-list"]}`}>
          {topNav().map((navItem: NavItem) => {
            if (navItem.subnav) {
              // Render the top-level navigation Link along with its subnav in the mega menu.
              return (
                <li
                  key={navItem.text}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveMegaMenu(navItem.text)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={navItem.path || "#"}
                    onClick={() => setActiveMegaMenu(null)}
                  >
                    {navItem.text}
                  </Link>
                </li>
              );
            }
            // Render the top-level navigation Link without a subnav in the mega menu.
            else {
              return (
                <li
                  key={navItem.text}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveMegaMenu(null)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={navItem.path || "#"}
                  >
                    {navItem.text}
                  </Link>
                </li>
              );
            }
          })}
        </ul>

        {/* The active mega menu. This is a single mega menu container whose content changes based on the activeMegaMenu state. */}
        <div className={`${styles["mega-menu-container"]} ${activeMegaMenu ? styles["show-mega-menu"] : ""}`.trim()}>
          <div className={styles["mega-menu"]}>
            {/* If the subnav item is an "all audience products" item, then display it in the top row - above the bottom row of columns. */}
            <div className={styles["mega-menu-top-row"]}>
              {activeSubnav && activeSubnav.map((subnavItem: NavItem) => {
                if (subnavItem.isAllAudienceProductsLink) {
                  return (
                    <Link
                      key={subnavItem.text}
                      href={subnavItem.path || "#"}
                      className={styles["mega-menu-top-row-item"]}
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      {subnavItem.text}
                    </Link>
                  );
                }
              })}
            </div>
            <ul className={`${styles["nav-list"]} ${styles["mega-menu-bottom-row"]}`}>
              {activeSubnav && activeSubnav.map((subnavItem: NavItem) => {
                // Do not display the "all audience products" item in the bottom row.
                if (subnavItem.isAllAudienceProductsLink) return;
                // Make sure to check for the existence of a subnav. 
                // I only want to display columns that have a heading and a subnav under that heading.
                // If the subnav item has a subnav, then display a category heading along with a list of subnav items.
                if (subnavItem.subnav) {
                  return (
                    // The category headings in the mega menu.
                    <li key={subnavItem.text}>
                      {/* NOTE: It is necessary to use an h5 tag as a child of the li in order to set the styles only on the li text instead of the ul that is a child of this li. */}
                      <h5 className={styles["mega-menu-column-heading"]}>
                        <Link
                          href={subnavItem.path || "#"}
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          {subnavItem.text}
                        </Link>
                      </h5>

                      {/* The column's subnav items in the mega menu. */}
                      <ul className={`${styles["nav-list"]} ${styles["mega-menu-subnav-list"]}`}>
                        {subnavItem.subnav.map((columnSubnavItem: NavItem) => (
                          <li key={columnSubnavItem.text}>
                            <Link
                              className={styles["mega-menu-subnav-item"]}
                              href={columnSubnavItem.path || "#"}
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              {columnSubnavItem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                // else {
                //   // If the subnavItem does not have a subnav, then display it as a link.
                //   // I have commented this out because I do not want to display a bunch of category headings across the mega menu without any subnav items.
                //   return (
                //     // The category headings in the mega menu.
                //     <li key={subnavItem.text}>
                //       {/* See my note above the other `.mega-menu-column-heading` element. */}
                //       <h5 className={styles["mega-menu-column-heading"]}>
                //         <Link
                //           className={styles["mega-menu-subnav-item"]}
                //           href={subnavItem.path || "#"}
                //           onClick={() => setActiveMegaMenu(null)}
                //         >
                //           {subnavItem.text}
                //         </Link>
                //       </h5>
                //     </li>
                //   );
                // }
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Icon nav */}
      <nav className={styles["desktop-nav-icons-container"]}>
        {iconNav().map((item, index) => {
          const IconComponent = item.icon ? iconMap[item.icon] : null;

          return (
            <button
              key={item.text}
              aria-label={item.text}
              className={styles["desktop-nav-icon"]}
              onClick={() => console.log("Clicked " + item.text)}
            >
              {IconComponent && <IconComponent size={24} />}
            </button>
          );
        })}
      </nav>
    </div>
  )
}
