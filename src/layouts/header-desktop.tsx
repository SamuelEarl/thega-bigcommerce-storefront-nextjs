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
  const [activeAudienceMenu, setActiveAudienceMenu] = useState<string | null>(null);

  // Find the active nav item's subnav data for the mega menu.
  // const activeCategorySubmenu = topNav()
  //   .find((item: NavItem) => item.text === activeAudienceMenu)
  //   ?.subnav ?? null;
  const activeCategorySubmenu = activeAudienceMenu ? topNav().audience[activeAudienceMenu].category : {};

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
          {Object.entries(topNav().audience).map(([audienceKey, audienceObj]) => {
            if (audienceObj.category) {
              // Render the top-level navigation Link along with its sub-menus in the mega menu.
              return (
                <li
                  key={audienceKey}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveAudienceMenu(audienceKey)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={audienceObj.path}
                    onClick={() => setActiveAudienceMenu(null)}
                  >
                    {audienceObj.text}
                  </Link>
                </li>
              );
            }
            // Render the top-level navigation Link without a subnav in the mega menu.
            else {
              return (
                <li
                  key={audienceKey}
                  className={styles["desktop-top-nav-item"]}
                  onMouseEnter={() => setActiveAudienceMenu(null)}
                >
                  <Link
                    className={styles["desktop-top-nav-item-link"]}
                    href={audienceObj.path}
                  >
                    {audienceObj.text}
                  </Link>
                </li>
              );
            }
          })}
        </ul>

        {/* The active mega menu. This is a single mega menu container whose content changes based on the activeAudienceMenu state. */}
        <div className={`${styles["mega-menu-container"]} ${activeAudienceMenu ? styles["show-mega-menu"] : ""}`.trim()}>
          <div className={styles["mega-menu"]}>
            {/* If the subnav item is an `isAllAudienceProductsLink` item, then display it in the top row - above the bottom row of columns. */}
            <div className={styles["mega-menu-top-row"]}>
              {activeCategorySubmenu && Object.entries(activeCategorySubmenu).map(([categoryKey, categoryObj]) => {
                if (categoryObj.isAllAudienceProductsLink) {
                  return (
                    <Link
                      key={categoryKey}
                      href={categoryObj.path}
                      className={styles["mega-menu-top-row-item"]}
                      onClick={() => setActiveAudienceMenu(null)}
                    >
                      {categoryObj.text}
                    </Link>
                  );
                }
              })}
            </div>
            <ul className={`${styles["nav-list"]} ${styles["mega-menu-bottom-row"]}`}>
              {activeCategorySubmenu && Object.entries(activeCategorySubmenu).map(([categoryKey, categoryObj]) => {
                // Do not display the `isAllAudienceProductsLink` item in the bottom row.
                if (categoryObj.isAllAudienceProductsLink) return;
                // Make sure to check for the existence of a productType. 
                // I only want to display columns that have a heading and a list of productTypes under that heading.
                // If the categoryObj has a productType, then display a category heading along with a list of productType items.
                if (categoryObj.productType) {
                  return (
                    // The category headings in the mega menu.
                    <li key={categoryKey}>
                      {/* NOTE: It is necessary to use an h5 tag as a child of the li in order to set the styles only on the li text instead of the ul that is a child of this li. */}
                      <h5 className={styles["mega-menu-column-heading"]}>
                        <Link
                          href={categoryObj.path}
                          onClick={() => setActiveAudienceMenu(null)}
                        >
                          {categoryObj.text}
                        </Link>
                      </h5>

                      {/* The column's subnav items in the mega menu. */}
                      <ul className={`${styles["nav-list"]} ${styles["mega-menu-subnav-list"]}`}>
                        {Object.entries(categoryObj.productType).map(([productTypeKey, productTypeObj]) => (
                          <li key={productTypeKey}>
                            <Link
                              className={styles["mega-menu-subnav-item"]}
                              href={productTypeObj.path}
                              onClick={() => setActiveAudienceMenu(null)}
                            >
                              {productTypeObj.text}
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
                //           href={subnavItem.path}
                //           onClick={() => setActiveAudienceMenu(null)}
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
