const menNav = {
  audience: "men",
  categories: [
    {
      name: "shoes",
      subcategories: [
        {
          name: "running",
          productTypes: ["road", "trail"],
        },
        {
          name: "soccer",
          productTypes: ["cleats", "turf"],
        },
        {
          name: "basketball",
          productTypes: ["high_tops", "low_tops"],
        },
      ]
    },
    {
      name: "clothing",
      subcategories: [
        {
          name: "pants",
          productTypes: ["running", "cross_training"],
        },
        {
          name: "shorts",
          productTypes: ["running", "soccer", "basketball"],
        },
        {
          name: "shirts_and_tops",
          productTypes: ["running", "soccer", "basketball"],
        },
      ]
    },
    {
      name: "accessories",
      subcategories: [
        {
          name: "hats",
          productTypes: ["baseball", "running"],
        },
        {
          name: "socks",
          productTypes: ["no_show", "crew", "mid_calf"],
        },
        {
          name: "belts",
          productTypes: ["casual", "golf"],
        },
      ]
    },
    {
      name: "sports",
      subcategories: [
        {
          name: "running",
          productCategories: [
            {
              name: "shoes",
              productTypes: ["road", "trail"],
            },
            {
              name: "clothing",
              productTypes: ["pants", "shorts", "shirts_and_tops"],
            },
            {
              name: "accessories",
              productTypes: ["hats", "socks", "belts"],
            }
          ],
        },
        {
          name: "soccer",
          productCategories: [
            {
              name: "shoes",
              productTypes: ["cleats", "turf"],
            },
            {
              name: "clothing",
              productTypes: ["shorts", "shirts_and_tops"],
            },
            {
              name: "accessories",
              productTypes: ["socks", "balls"],
            }
          ],
        },
        {
          name: "basketball",
          productCategories: [
            {
              name: "shoes",
              productTypes: ["high_tops", "low_tops"],
            },
            {
              name: "clothing",
              productTypes: ["jerseys", "shorts", "shirts_and_tops"],
            },
            {
              name: "accessories",
              productTypes: ["socks", "balls"],
            }
          ],
        },
      ]
    }
  ]
};

// const womenNav = {
//   audience: "women",
//   categories: {
//     shoes: ["running", "soccer", "basketball"],
//     clothing: ["pants", "shorts", "shirts_and_tops"],
//     accessories: ["hats", "socks", "belts"],
//     sports: {
//       running: ["shoes", "shorts", "shirts_and_tops"],
//       soccer: ["shoes", "shorts", "shirts_and_tops"],
//       basketball: ["shoes", "shorts", "shirts_and_tops"],
//     },
//   }
// };

// const kidsNav = {
//   audience: "kids",
//   categories: {
//     shoes: ["running", "soccer", "basketball"],
//     clothing: ["pants", "shorts", "shirts_and_tops"],
//     accessories: ["hats", "socks", "belts"],
//     sports: {
//       running: ["shoes", "shorts", "shirts_and_tops"],
//       soccer: ["shoes", "shorts", "shirts_and_tops"],
//       basketball: ["shoes", "shorts", "shirts_and_tops"],
//     },
//   }
// };


export interface IProductType {
  text: string;
  path: string;
  navType: string;
  hasSamePathAsParentNav?: boolean;
}

export interface ISubcategory {
  text: string;
  path: string;
  navType: string;
  subnav?: IProductType[];
  hasSamePathAsParentNav?: boolean;
};

export interface ICategory {
  text: string;
  path: string;
  navType: string;
  subnav?: ISubcategory[];
  hasSamePathAsParentNav?: boolean;
};

export interface IAudience {
  text: string;
  path: string;
  navType: string;
  subnav?: ICategory[];
}

// Union type for any navigation item
export type NavItem = IAudience | ICategory | ISport | IProductType;

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format product type slug to display name (e.g., "shirts_and_tops" -> "Shirts & Tops")
function formatProductTypeName(slug: string): string {
  return slug
    .split('_')
    .map(word => word === 'and' ? '&' : capitalizeFirstLetter(word))
    .join(' ');
}

// Create a regular category (Shoes, Clothing, Accessories)
function createCategoryNav(audience: string, categoryName: string, productTypes: string[]): ICategory {
  const categoryDisplay = capitalizeFirstLetter(categoryName);
  const audienceDisplay = capitalizeFirstLetter(audience);

  return {
    text: categoryDisplay,
    path: `/shop/${audience}/${categoryName}`,
    navType: "category",
    subnav: [
      {
        text: `All ${audienceDisplay}'s ${categoryDisplay}`,
        path: `/shop/${audience}/${categoryName}`,
        navType: "allCategoryProducts",
      },
      ...productTypes.map((productType) => ({
        text: formatProductTypeName(productType),
        path: `/shop/${audience}/${categoryName}/${productType}`,
        navType: "productType",
      })),
    ],
  };
}

// Create a sport with its product types
function createSportNav(audience: string, sportName: string, productTypes: string[]): ISport {
  const sportDisplay = capitalizeFirstLetter(sportName);
  const audienceDisplay = capitalizeFirstLetter(audience);

  return {
    text: sportDisplay,
    path: `/shop/${audience}/${sportName}`,
    navType: "sport",
    subnav: [
      {
        text: `All ${audienceDisplay}'s ${sportDisplay}`,
        path: `/shop/${audience}/${sportName}`,
        navType: "allProductType",
      },
      ...productTypes.map((productType) => ({
        text: formatProductTypeName(productType),
        path: `/shop/${audience}/${sportName}/${productType}`,
        navType: "productType",
      })),
    ],
  };
}

// Create the Sports category with all sports
function createSportsCategory(audience: string, sportsObj: Record<string, string[]>): ICategory {
  const audienceDisplay = capitalizeFirstLetter(audience);

  return {
    text: "Sports",
    path: `/shop/${audience}/sports`,
    navType: "category",
    subnav: [
      {
        text: `All ${audienceDisplay}'s Sports`,
        path: `/shop/${audience}/sports`,
        navType: "allSports",
      },
      ...Object.entries(sportsObj).map(([sportName, productTypes]) =>
        createSportNav(audience, sportName, productTypes)
      ),
    ],
  };
}

// Main function to create audience navigation from config object
function createAudienceNav(config: { audience: string; categories: Record<string, string[] | Record<string, string[]>> }): IAudience {
  const { audience, categories } = config;
  const audienceDisplay = capitalizeFirstLetter(audience);

  const subnav: ICategory[] = [
    // "All [Audience]'s Products" link
    {
      text: `All ${audienceDisplay}'s Products`,
      path: `/shop/${audience}`,
      navType: "allAudienceProducts",
      hasSamePathAsParentNav: true,
    },
  ];

  // Process each category
  Object.entries(categories).forEach(([categoryName, value]) => {
    if (categoryName === 'sports' && typeof value === 'object' && !Array.isArray(value)) {
      // Special handling for sports category
      subnav.push(createSportsCategory(audience, value as Record<string, string[]>));
    } else if (Array.isArray(value)) {
      // Regular category with product types
      subnav.push(createCategoryNav(audience, categoryName, value));
    }
  });

  return {
    text: audience.toUpperCase(),
    path: `/shop/${audience}`,
    navType: "audience",
    subnav,
  };
}

export function createTopNav() {
  return [
    createAudienceNav(menNav),
    // createAudienceNav(womenNav),
    // createAudienceNav(kidsNav),
  ];
}

export function topNav(): IAudience[] {
  return createTopNav();
}

// Keep old implementation commented for reference
export function TOP_NAV_OLD(): IAudience[] {
  return [
    {
      text: "MEN",
      path: "/shop/men",
      navType: "audience",
      subnav: [
        {
          text: "All Men's Products",
          path: "/shop/men",
          navType: "audience", // This is an "audience" navType because it has the same path as its parent nav.
          hasSamePathAsParentNav: true,
        },
        {
          text: "Shoes",
          path: "/shop/men/shoes",
          navType: "category",
          subnav: [
            {
              text: "All Men's Shoes",
              path: "/shop/men/shoes",
              navType: "category",
              hasSamePathAsParentNav: true,
            },
            {
              text: "Running",
              path: "/shop/men/shoes/running",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Running Shoes",
                  path: "/shop/men/shoes/running",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Road",
                  path: "/shop/men/shoes/running/road",
                  navType: "productType",
                },
                {
                  text: "Trail",
                  path: "/shop/men/shoes/running/trail",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Soccer",
              path: "/shop/men/shoes/soccer",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Soccer Shoes",
                  path: "/shop/men/shoes/soccer",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Cleats",
                  path: "/shop/men/shoes/soccer/cleats",
                  navType: "productType",
                },
                {
                  text: "Turf",
                  path: "/shop/men/shoes/soccer/turf",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Basketball",
              path: "/shop/men/shoes/basketball",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Basketball Shoes",
                  path: "/shop/men/shoes/basketball",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "High Tops",
                  path: "/shop/men/shoes/basketball/high_tops",
                  navType: "productType",
                },
                {
                  text: "Low Tops",
                  path: "/shop/men/shoes/basketball/low_tops",
                  navType: "productType",
                },
              ],
            },
          ],
        },
        {
          text: "Clothing",
          path: "/shop/men/clothing",
          navType: "category",
          subnav: [
            {
              text: "All Men's Clothing",
              path: "/shop/men/clothing",
              navType: "category",
              hasSamePathAsParentNav: true,
            },
            {
              text: "Pants",
              path: "/shop/men/clothing/pants",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Pants",
                  path: "/shop/men/clothing/pants",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Running",
                  path: "/shop/men/clothing/pants/running",
                  navType: "productType",
                },
                {
                  text: "Cross Training",
                  path: "/shop/men/clothing/pants/cross_training",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Shorts",
              path: "/shop/men/clothing/shorts",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Shorts",
                  path: "/shop/men/clothing/shorts",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Running",
                  path: "/shop/men/clothing/shorts/running",
                  navType: "productType",
                },
                {
                  text: "Soccer",
                  path: "/shop/men/clothing/shorts/soccer",
                  navType: "productType",
                },
                {
                  text: "Basketball",
                  path: "/shop/men/clothing/shorts/basketball",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Shirts & Tops",
              path: "/shop/men/clothing/shirts_and_tops",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Shirts & Tops",
                  path: "/shop/men/clothing/shirts_and_tops",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Running",
                  path: "/shop/men/clothing/shirts_and_tops/running",
                  navType: "productType",
                },
                {
                  text: "Soccer",
                  path: "/shop/men/clothing/shirts_and_tops/soccer",
                  navType: "productType",
                },
                {
                  text: "Basketball",
                  path: "/shop/men/clothing/shirts_and_tops/basketball",
                  navType: "productType",
                },
              ],
            },
          ],
        },
        {
          text: "Accessories",
          path: "/shop/men/accessories",
          navType: "category",
          subnav: [
            {
              text: "All Men's Accessories",
              path: "/shop/men/accessories",
              navType: "category",
              hasSamePathAsParentNav: true,
            },
            {
              text: "Hats",
              path: "/shop/men/accessories/hats",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Hats",
                  path: "/shop/men/accessories/hats",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Baseball",
                  path: "/shop/men/accessories/hats/baseball",
                  navType: "productType",
                },
                {
                  text: "Running",
                  path: "/shop/men/accessories/hats/running",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Socks",
              path: "/shop/men/accessories/socks",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Socks",
                  path: "/shop/men/accessories/socks",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "No Show",
                  path: "/shop/men/accessories/socks/no_show",
                  navType: "productType",
                },
                {
                  text: "Crew",
                  path: "/shop/men/accessories/socks/crew",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Belts",
              path: "/shop/men/accessories/belts",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Belts",
                  path: "/shop/men/accessories/belts",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Casual",
                  path: "/shop/men/accessories/belts/casual",
                  navType: "productType",
                },
                {
                  text: "Golf",
                  path: "/shop/men/accessories/belts/golf",
                  navType: "productType",
                },
              ],
            },
          ],
        },
        {
          text: "Sports",
          path: "/shop/men/sports",
          navType: "category",
          subnav: [
            {
              text: "All Men's Sports",
              path: "/shop/men/sports",
              navType: "category",
              hasSamePathAsParentNav: true,
            },
            {
              text: "Running",
              path: "/shop/men/running",
              navType: "subcategory",
              subnav: [
                {
                  text: "All Men's Running",
                  path: "/shop/men/running",
                  navType: "subcategory",
                  hasSamePathAsParentNav: true,
                },
                {
                  text: "Shoes",
                  path: "/shop/men/running/shoes",
                  navType: "productType",
                },
                {
                  text: "Shorts",
                  path: "/shop/men/running/shorts",
                  navType: "productType",
                },
                {
                  text: "Shirts & Tops",
                  path: "/shop/men/running/shirts_and_tops",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Soccer",
              path: "/shop/men/soccer",
              navType: "sport",
              subnav: [
                {
                  text: "All Men's Soccer",
                  path: "/shop/men/soccer",
                  navType: "allProductType",
                },
                {
                  text: "Shoes",
                  path: "/shop/men/soccer/shoes",
                  navType: "productType",
                },
                {
                  text: "Shorts",
                  path: "/shop/men/soccer/shorts",
                  navType: "productType",
                },
                {
                  text: "Shirts & Tops",
                  path: "/shop/men/soccer/shirts_and_tops",
                  navType: "productType",
                },
              ],
            },
            {
              text: "Basketball",
              path: "/shop/men/basketball",
              navType: "sport",
              subnav: [
                {
                  text: "All Men's Basketball",
                  path: "/shop/men/basketball",
                  navType: "allProductType",
                },
                {
                  text: "Shoes",
                  path: "/shop/men/basketball/shoes",
                  navType: "productType",
                },
                {
                  text: "Shorts",
                  path: "/shop/men/basketball/shorts",
                  navType: "productType",
                },
                {
                  text: "Shirts & Tops",
                  path: "/shop/men/basketball/shirts_and_tops",
                  navType: "productType",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

export interface IconNavItem {
  text: string;
  icon: string;
  path: string;
}

export function iconNav(): IconNavItem[] {
  return [
    {
      text: "Search",
      icon: "search-line",
      path: "/search",
    },
    {
      text: "Shopping Bag",
      icon: "shopping-bag-line",
      path: "/shopping-bag",
    },
    {
      text: "User Account",
      icon: "user-line",
      path: "/user-account",
    },
  ];
}

export interface CompanyInfoNavItem {
  text: string;
  path: string;
}

export function companyInfoNav(): CompanyInfoNavItem[] {
  return [
    {
      text: "About Us",
      path: "/about-us",
    },
    {
      text: "Contact Us",
      path: "/contact-us",
    },
    {
      text: "Shipping & Delivery Policies",
      path: "/shipping-and-delivery-policies",
    },
    {
      text: "Returns, Exchanges, Refunds",
      path: "/returns-exchanges-refunds",
    },
    {
      text: "FAQ",
      path: "/faq",
    },
    {
      text: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      text: "Terms of Service",
      path: "/terms-of-service",
    },
  ];
}
