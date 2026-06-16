export interface IProductType {
  text: string;
  path: string;
  navType: string;
}

export interface ISport {
  text: string;
  path: string;
  navType: string;
  subnav?: IProductType[];
};

export interface ICategory {
  text: string;
  path: string;
  navType: string;
  subnav?: ISport[] | IProductType[];
  isAllAudienceProductsLink?: boolean;
};

export interface IAudience {
  text: string;
  path: string;
  navType: string;
  subnav?: ICategory[];
}

export function topNav(): IAudience[] {
  return [
    {
      text: "MEN",
      path: "/shop/men",
      navType: "audience",
      subnav: [
        {
          text: "All Men's Products",
          path: "/shop/men",
          navType: "allAudienceProducts",
          isAllAudienceProductsLink: true,
        },
        {
          text: "Shoes",
          path: "/shop/men/shoes",
          navType: "category",
          subnav: [
            {
              text: "All Men's Shoes",
              path: "/shop/men/shoes",
              navType: "allCategoryProducts",
            },
            {
              text: "Running",
              path: "/shop/men/shoes/running",
              navType: "productType",
            },
            {
              text: "Soccer",
              path: "/shop/men/shoes/soccer",
              navType: "productType",
            },
            {
              text: "Basketball",
              path: "/shop/men/shoes/basketball",
              navType: "productType",
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
              navType: "allCategoryProducts",
            },
            {
              text: "Pants",
              path: "/shop/men/clothing/pants",
              navType: "productType",
            },
            {
              text: "Shorts",
              path: "/shop/men/clothing/shorts",
              navType: "productType",
            },
            {
              text: "Shirts & Tops",
              path: "/shop/men/clothing/shirts_and_tops",
              navType: "productType",
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
              navType: "allCategoryProducts",
            },
            {
              text: "Hats",
              path: "/shop/men/accessories/hats",
              navType: "productType",
            },
            {
              text: "Socks",
              path: "/shop/men/accessories/socks",
              navType: "productType",
            },
            {
              text: "Belts",
              path: "/shop/men/accessories/belts",
              navType: "productType",
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
              navType: "allSports",
            },
            {
              text: "Running",
              path: "/shop/men/running",
              navType: "sport",
              subnav: [
                {
                  text: "All Men's Running",
                  path: "/shop/men/running",
                  navType: "allProductType",
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
    // {
    //   text: "WOMEN",
    //   path: "/shop/women",
    //   category: {
    //     all: {
    //       text: "All Women's Products",
    //       path: "/shop/women",
    //       isAllAudienceProductsLink: true,
    //     },
    //     shoes: {
    //       text: "Shoes",
    //       path: "/shop/women/shoes",
    //       productType: {
    //         all: {
    //           text: "All Women's Shoes",
    //           path: "/shop/women/shoes",
    //         },
    //         running: {
    //           text: "Running",
    //           path: "/shop/women/shoes/running",
    //         },
    //         soccer: {
    //           text: "Soccer",
    //           path: "/shop/women/shoes/soccer",
    //         },
    //         basketball: {
    //           text: "Basketball",
    //           path: "/shop/women/shoes/basketball",
    //         },
    //       },
    //     },
    //     clothing: {
    //       text: "Clothing",
    //       path: "/shop/women/clothing",
    //       productType: {
    //         all: {
    //           text: "All Women's Clothing",
    //           path: "/shop/women/clothing",
    //         },
    //         pants: {
    //           text: "Pants",
    //           path: "/shop/women/clothing/pants",
    //         },
    //         shorts: {
    //           text: "Shorts",
    //           path: "/shop/women/clothing/shorts",
    //         },
    //         shirtsAndTops: {
    //           text: "Shirts & Tops",
    //           path: "/shop/women/clothing/shirts_and_tops",
    //         },
    //       },
    //     },
    //     accessories: {
    //       text: "Accessories",
    //       path: "/shop/women/accessories",
    //       productType: {
    //         all: {
    //           text: "All Women's Accessories",
    //           path: "/shop/women/accessories",
    //         },
    //         hats: {
    //           text: "Hats",
    //           path: "/shop/women/accessories/hats",
    //         },
    //         socks: {
    //           text: "Socks",
    //           path: "/shop/women/accessories/socks",
    //         },
    //         belts: {
    //           text: "Belts",
    //           path: "/shop/women/accessories/belts",
    //         },
    //       },
    //     },
    //   },
    // },
    // {
    // text: "KIDS",
    // path: "/shop/kids",
    // category: {
    //   all: {
    //     text: "All Kids Products",
    //     path: "/shop/kids",
    //     isAllAudienceProductsLink: true,
    //   },
    //   shoes: {
    //     text: "Shoes",
    //     path: "/shop/kids/shoes",
    //     productType: {
    //       all: {
    //         text: "All Kids Shoes",
    //         path: "/shop/kids/shoes",
    //       },
    //       running: {
    //         text: "Running",
    //         path: "/shop/kids/shoes/running",
    //       },
    //       soccer: {
    //         text: "Soccer",
    //         path: "/shop/kids/shoes/soccer",
    //       },
    //       basketball: {
    //         text: "Basketball",
    //         path: "/shop/kids/shoes/basketball",
    //       },
    //     },
    //   },
    //   clothing: {
    //     text: "Clothing",
    //     path: "/shop/kids/clothing",
    //     productType: {
    //       all: {
    //         text: "All Kids Clothing",
    //         path: "/shop/kids/clothing",
    //       },
    //       pants: {
    //         text: "Pants",
    //         path: "/shop/kids/clothing/pants",
    //       },
    //       shorts: {
    //         text: "Shorts",
    //         path: "/shop/kids/clothing/shorts",
    //       },
    //       shirtsAndTops: {
    //         text: "Shirts & Tops",
    //         path: "/shop/kids/clothing/shirts_and_tops",
    //       },
    //     },
    //   },
    //   accessories: {
    //     text: "Accessories",
    //     path: "/shop/kids/accessories",
    //     productType: {
    //       all: {
    //         text: "All Kids Accessories",
    //         path: "/shop/kids/accessories",
    //       },
    //       hats: {
    //         text: "Hats",
    //         path: "/shop/kids/accessories/hats",
    //       },
    //       socks: {
    //         text: "Socks",
    //         path: "/shop/kids/accessories/socks",
    //       },
    //       belts: {
    //         text: "Belts",
    //         path: "/shop/kids/accessories/belts",
    //       },
    //     },
    //   },
    // },
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
