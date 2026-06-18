import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  RiCloseLargeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiShoppingBagLine,
  RiUserLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { iconNav, topNav, INavItem } from "@/navigation";
import Logo from "@/../public/images/logo-and-name-horizontal-white-fbfbfb.svg"
import styles from "./mobile-nav.module.css"


// Icon mapping
const iconMap: Record<string, RemixiconComponentType> = {
  "search-line": RiSearchLine,
  "shopping-bag-line": RiShoppingBagLine,
  "user-line": RiUserLine,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Tracks which Audience menu is active and currently displayed (e.g. "MEN", "WOMEN"). null = Level 1, shows the audience options.
  const [activeAudienceMenu, setActiveAudienceMenu] = useState<string | null>(null);
  // Tracks which Category submenu is active (e.g. "Shoes", "Clothing", "Sports"). null = Level 2, shows the category options.
  const [activeCategorySubmenu, setActiveCategorySubmenu] = useState<string | null>(null);
  // Tracks which Sport submenu is active (e.g. "Running", "Soccer", "Basketball"). null = Level 3, shows the sport options.
  const [activeSportSubmenu, setActiveSportSubmenu] = useState<string | null>(null);

  // Reset everything and close.
  const closeAll = () => {
    setActiveSportSubmenu(null);
    setActiveCategorySubmenu(null);
    setActiveAudienceMenu(null);
    onClose();
  };

  return (
    <nav className={styles["mobile-menu-container"]}>
      <div className={styles["mobile-menu-header"]}>
        <button
          className={styles["mobile-menu-header-btn"]}
          onClick={() => closeAll()}
        >
          <RiCloseLargeLine size={30} />
        </button>

        <div className={styles["logo-container"]}>
          <Link
            href={"/"}
            onClick={() => closeAll()}
          >
            <Image
              src={Logo}
              height={35}
              className={styles["logo"]}
              alt="THEGA Logo"
              loading="eager"
            />
          </Link>
        </div>

        <button
          className={styles["mobile-menu-header-btn-transparent"]}
          disabled
        >
          <RiCloseLargeLine size={30} />
        </button>
      </div>

      <div className={styles["mobile-menu-icons-container"]}>
        {iconNav().map((item, index) => {
          const IconComponent = item.icon ? iconMap[item.icon] : null;

          return (
            <button
              key={item.text}
              aria-label={item.text}
              className={`${styles["mobile-menu-header-btn"]} ${styles["icon-button"]}`}
              onClick={() => {
                console.log("Clicked icon button");
              }}
            >
              {IconComponent && <IconComponent size={24} />}
            </button>
          );
        })}
      </div>

      {/* Menu container (sliding menu with 4 panels) */}
      {/* If activeAudienceMenu, activeCategorySubmenu, and activeSportSubmenu are all null = Level 1 (Default). */}
      {/* If activeAudienceMenu is truthy = Level 2. */}
      {/* If activeCategorySubmenu is truthy = Level 3. */}
      {/* If activeSportSubmenu is truthy = Level 4. */}
      <div className={`${styles["nav-container"]} ${activeAudienceMenu ? styles["slide-level2"] : ""} ${activeCategorySubmenu ? styles["slide-level3"] : ""} ${activeSportSubmenu ? styles["slide-level4"] : ""}`.trim()}>

        {/* Level 1 Panel: Audience navigation (e.g. Men, Women, Kids) */}
        <div className={styles["nav-panel"]}>
          <ul className={styles["navigation-list"]}>
            {topNav().map((audience) => (
              <li key={audience.text} className={styles["nav-item"]}>
                {
                  // If the audience nav item has a subnav, then display a button that can be clicked, which will then display the audience > categories menu. If the button is clicked, then set `activeAudienceMenu` to equal `audience.text`.
                  audience.subnav ?
                    (
                      <button
                        className={styles["nav-trigger"]}
                        onClick={() => setActiveAudienceMenu(audience.text)}
                      >
                        {audience.text}
                        <RiArrowRightSLine size={30} color="var(--old-gold)" />
                      </button>
                    ) :
                    // Else display a direct Link to a page for items with no subnav.
                    (
                      <Link
                        href={audience.path || "#"}
                        onClick={() => closeAll()}
                      >
                        {audience.text}
                      </Link>
                    )
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Level 2 Panel: Category navigation (e.g. Shoes, Clothing, Accessories, Sports). */}
        <div className={styles["nav-panel"]}>
          {activeAudienceMenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveAudienceMenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeAudienceMenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeAudienceMenu in topNav() and map over its subnav. */}
                {topNav().find((item) => item.text === activeAudienceMenu)?.subnav?.map((subnavItem) => (
                  <li key={subnavItem.text} className={styles["nav-item"]}>
                    {/* If subnavItem has a subnav, then set activeCategorySubMenu to equal subnavItem.text. */}
                    {'subnav' in subnavItem && subnavItem.subnav ? (
                      // Set the activeCategorySubmenu to equal subnavItem.text, which will trigger the slide to Level 3.
                      <button
                        className={styles["nav-trigger"]}
                        onClick={() => setActiveCategorySubmenu(subnavItem.text)}
                      >
                        {subnavItem.text}
                        <RiArrowRightSLine size={30} color="var(--old-gold)" />
                      </button>
                    ) : (
                      // Else display a Link to a page for items with no subnav.
                      <Link
                        href={subnavItem.path || "#"}
                        onClick={() => closeAll()}
                      >
                        {subnavItem.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Level 3 Panel: Sport/Product Type navigation (e.g. All Men's Shoes, Running, Soccer for Shoes category OR Running, Soccer, Basketball for Sports category) */}
        <div className={styles["nav-panel"]}>
          {activeAudienceMenu && activeCategorySubmenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveCategorySubmenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeCategorySubmenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeAudienceMenu, then find activeCategorySubmenu within it, then map over the category's subnav to display sports or productTypes. */}
                {topNav()
                  .find((item) => item.text === activeAudienceMenu)
                  ?.subnav?.find((subItem) => subItem.text === activeCategorySubmenu)
                  ?.subnav?.map((sportOrProductTypeItem) => (
                    <li key={sportOrProductTypeItem.text} className={styles["nav-item"]}>
                      {/* If this item has a subnav (it's a sport with product types), show a button to navigate to Level 4 */}
                      {'subnav' in sportOrProductTypeItem && sportOrProductTypeItem.subnav ? (
                        <button
                          className={styles["nav-trigger"]}
                          onClick={() => setActiveSportSubmenu(sportOrProductTypeItem.text)}
                        >
                          {sportOrProductTypeItem.text}
                          <RiArrowRightSLine size={30} color="var(--old-gold)" />
                        </button>
                      ) : (
                        // Else display a direct Link for items with no subnav
                        <Link
                          href={sportOrProductTypeItem.path || "#"}
                          onClick={() => closeAll()}
                        >
                          {sportOrProductTypeItem.text}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Level 4 Panel: Product Type navigation within a specific sport (e.g. Shoes, Shorts, Shirts & Tops for Running) */}
        <div className={styles["nav-panel"]}>
          {activeAudienceMenu && activeCategorySubmenu && activeSportSubmenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveSportSubmenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeSportSubmenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeAudienceMenu, then activeCategorySubmenu, then activeSportSubmenu, then map over the sport's subnav to display the product types. */}
                {(() => {
                  const categorySubnav = topNav()
                    .find((item) => item.text === activeAudienceMenu)
                    ?.subnav?.find((subItem) => subItem.text === activeCategorySubmenu)
                    ?.subnav;

                  const sportItem = categorySubnav?.find((item) => item.text === activeSportSubmenu) as INavItem | undefined;

                  // Only map over subnav if the sportItem has a subnav.
                  if (sportItem?.subnav) {
                    return sportItem.subnav.map((productTypeItem) => (
                      <li key={productTypeItem.text} className={styles["nav-item"]}>
                        <Link
                          href={productTypeItem.path || "#"}
                          onClick={() => closeAll()}
                        >
                          {productTypeItem.text}
                        </Link>
                      </li>
                    ));
                  }
                  return null;
                })()}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
