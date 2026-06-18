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
import { iconNav, INavItem, topNav } from "@/navigation";
import styles from "./header-desktop.module.css";

// Icon mapping
const iconMap: Record<string, RemixiconComponentType> = {
  "search-line": RiSearchLine,
  "shopping-bag-line": RiShoppingBagLine,
  "user-line": RiUserLine,
};

export default function HeaderDesktop() {
  // Track which mega menu is open by nav item text. null = all closed.
  const [activeAudienceMenu, setActiveAudienceMenu] = useState<string | null>(null);

  // Find the active nav item's subnav data for the mega menu.
  const activeCategorySubmenu = topNav()
    .find((item: INavItem) => item.text === activeAudienceMenu)
    ?.subnav ?? null;
  // const activeCategorySubmenu = activeAudienceMenu ? topNav().audience[activeAudienceMenu].category : {};

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
        onMouseLeave={() => setActiveAudienceMenu(null)}
      >
        {/* The Audience navigation items that appear in the header (above the mega menu). */}
        <ul className={`${styles["nav-list"]} ${styles["desktop-top-nav-list"]}`}>
          {topNav().map((audience) => {
            if (audience.subnav) {
              // Render the top-level navigation Link along with its subnav in the mega menu.
              return (
                <li
                  key={audience.text}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveAudienceMenu(audience.text)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={audience.path}
                    onClick={() => setActiveAudienceMenu(null)}
                  >
                    {audience.text}
                  </Link>
                </li>
              );
            }
            // Render the top-level navigation Link without a subnav in the mega menu.
            else {
              return (
                <li
                  key={audience.text}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveAudienceMenu(null)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={audience.path}
                  >
                    {audience.text}
                  </Link>
                </li>
              );
            }
          })}
        </ul>

        {/* The active mega menu. This is a single mega menu container whose content changes based on the activeAudienceMenu state. */}
        <div className={`${styles["mega-menu-container"]} ${activeAudienceMenu ? styles["show-mega-menu"] : ""}`.trim()}>
          <div className={styles["mega-menu"]}>
            {/* If the subnav item is a `hasSamePathAsParentNavItem` item, then display it in the top row - above the bottom row of columns. */}
            <div className={styles["mega-menu-top-row"]}>
              {activeCategorySubmenu && activeCategorySubmenu.map((category) => {
                if (category.hasSamePathAsParentNavItem) {
                  return (
                    <Link
                      key={category.text}
                      href={category.path}
                      className={styles["mega-menu-top-row-item"]}
                      onClick={() => setActiveAudienceMenu(null)}
                    >
                      {category.text}
                    </Link>
                  );
                }
              })}
            </div>
            {/* Categories row (Shoes, Clothing, Accessories) - excludes Sports */}
            <ul className={`${styles["nav-list"]} ${styles["mega-menu-categories-row"]}`}>
              {activeCategorySubmenu && activeCategorySubmenu.map((category) => {
                // Do not display the `hasSamePathAsParentNavItem` item or Sports category in this row.
                if (category.hasSamePathAsParentNavItem || category.text === "Sports") return;
                // Make sure to check for the existence of a subnav.
                // I only want to display columns that have a heading and a subnav under that heading.
                // If the category has a subnav, then display a category heading along with a subnav.
                if (category.subnav) {
                  return (
                    // The category headings in the mega menu.
                    <li key={category.text}>
                      {/* NOTE: It is necessary to use an h5 tag as a child of the li in order to set the styles only on the li text instead of the ul that is a child of this li. */}
                      <h5 className={styles["mega-menu-column-heading"]}>
                        <Link
                          href={category.path}
                          onClick={() => setActiveAudienceMenu(null)}
                        >
                          {category.text}
                        </Link>
                      </h5>

                      {/* The category's subnav items in the mega menu. */}
                      <ul className={`${styles["nav-list"]} ${styles["mega-menu-subnav-list"]}`}>
                        {category.subnav.map((productType) => (
                          <li key={productType.text}>
                            <Link
                              className={styles["mega-menu-subnav-item"]}
                              href={productType.path}
                              onClick={() => setActiveAudienceMenu(null)}
                            >
                              {productType.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>

            {/* Sports row - displays each sport as a column with its product types */}
            <ul className={`${styles["nav-list"]} ${styles["mega-menu-sports-row"]}`}>
              {(() => {
                // Find the Sports category.
                const sportsCategory = activeCategorySubmenu?.find((category) => category.text === "Sports");

                // If sportsCategory exists and has a `subnav` property, then map over the sports.subnav array.
                if (sportsCategory?.subnav) {
                  return sportsCategory.subnav.map((sport) => {
                    // Skip the "All Men's Sports" link
                    if (sport.hasSamePathAsParentNavItem) return null;

                    // Display each sport as a column heading with the respective product types below the heading.
                    if (sport.subnav) {
                      return (
                        <li key={sport.text}>
                          <h5 className={styles["mega-menu-column-heading"]}>
                            <Link
                              href={sport.path}
                              onClick={() => setActiveAudienceMenu(null)}
                            >
                              {sport.text}
                            </Link>
                          </h5>

                          {/* The sport's product type items */}
                          <ul className={`${styles["nav-list"]} ${styles["mega-menu-subnav-list"]}`}>
                            {sport.subnav.map((productType) => (
                              <li key={productType.text}>
                                <Link
                                  className={styles["mega-menu-subnav-item"]}
                                  href={productType.path}
                                  onClick={() => setActiveAudienceMenu(null)}
                                >
                                  {productType.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }
                    return null;
                  });
                }
                return null;
              })()}
            </ul>
          </div>
        </div>
      </nav>

      {/* Icon nav in the header */}
      <nav className={styles["desktop-nav-icons-container"]}>
        {iconNav().map((item) => {
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
