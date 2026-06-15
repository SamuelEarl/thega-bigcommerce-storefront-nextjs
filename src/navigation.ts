export interface NavItem {
  text: string;
  icon?: string;
  path?: string;
  isAllAudienceProductsLink?: boolean;
  subnav?: NavItem[];
}

// --------------------------------
// Note about URL encoding using the '&' character in URLs:
// --------------------------------
// The & character needs to be URL-encoded as %26 in the URL. So it should be ?category=shirts-%26-tops.
// If you're creating these URLs programmatically, here's how to ensure proper encoding:

// ✅ Good - URLSearchParams automatically encodes special characters
// const params = new URLSearchParams();
// params.set("category", "shirts-&-tops");
// const url = `${pathname}?${params.toString()}`;
// Results in: ?category=shirts-%26-tops

// ✅ Good - manual encoding
// const value = "shirts-&-tops";
// const url = `${pathname}?category=${encodeURIComponent(value)}`;

// ❌ Bad - unencoded ampersand
// const url = `${pathname}?category=shirts-&-tops`;
// Browser sees two params: category=shirts- and tops
// --------------------------------

export function topNav() {
  return {
    audience: {
      men: {
        text: "MEN",
        path: "/shop/men",
        category: {
          all: {
            text: "All Men's Products",
            path: "/shop/men",
            isAllAudienceProductsLink: true,
          },
          shoes: {
            text: "Shoes",
            path: "/shop/men/shoes",
            productType: {
              all: {
                text: "All Men's Shoes",
                path: "/shop/men/shoes",
              },
              running: {
                text: "Running",
                path: "/shop/men/shoes/running",
              },
              soccer: {
                text: "Soccer",
                path: "/shop/men/shoes/soccer",
              },
              basketball: {
                text: "Basketball",
                path: "/shop/men/shoes/basketball",
              },
            },
          },
          clothing: {
            text: "Clothing",
            path: "/shop/men/clothing",
            productType: {
              all: {
                text: "All Men's Clothing",
                path: "/shop/men/clothing",
              },
              pants: {
                text: "Pants",
                path: "/shop/men/clothing/pants",
              },
              shorts: {
                text: "Shorts",
                path: "/shop/men/clothing/shorts",
              },
              shirtsAndTops: {
                text: "Shirts & Tops",
                path: "/shop/men/clothing/shirts_and_tops",
              },
            },
          },
          accessories: {
            text: "Accessories",
            path: "/shop/men/accessories",
            productType: {
              all: {
                text: "All Men's Accessories",
                path: "/shop/men/accessories",
              },
              hats: {
                text: "Hats",
                path: "/shop/men/accessories/hats",
              },
              socks: {
                text: "Socks",
                path: "/shop/men/accessories/socks",
              },
              belts: {
                text: "Belts",
                path: "/shop/men/accessories/belts",
              },
            },
          },
          sports: {
            text: "Sports",
            path: "/shop/men/sports",
            sports: {
              all: {
                text: "All Men's Sports",
                path: "/shop/men/sports",
              },
              running: {
                text: "Running",
                path: "/shop/men/sports/running",
                productType: {
                  all: {
                    text: "All Men's Running",
                    path: "/shop/men/running",
                  },
                  shoes: {
                    text: "Shoes",
                    path: "/shop/men/running/shoes",
                  },
                  shorts: {
                    text: "Shorts",
                    path: "/shop/men/running/shorts",
                  },
                  shirtsAndTops: {
                    text: "Shirts & Tops",
                    path: "/shop/men/running/shirts_and_tops",
                  },
                },
              },
              soccer: {
                text: "Soccer",
                path: "/shop/men/sports/soccer",
                productType: {
                  all: {
                    text: "All Men's Soccer",
                    path: "/shop/men/soccer",
                  },
                  shoes: {
                    text: "Shoes",
                    path: "/shop/men/soccer/shoes",
                  },
                  shorts: {
                    text: "Shorts",
                    path: "/shop/men/soccer/shorts",
                  },
                  shirtsAndTops: {
                    text: "Shirts & Tops",
                    path: "/shop/men/soccer/shirts_and_tops",
                  },
                },
              },
              basketball: {
                text: "Basketball",
                path: "/shop/men/sports/basketball",
                productType: {
                  all: {
                    text: "All Men's Basketball",
                    path: "/shop/men/basketball",
                  },
                  shoes: {
                    text: "Shoes",
                    path: "/shop/men/basketball/shoes",
                  },
                  shorts: {
                    text: "Shorts",
                    path: "/shop/men/basketball/shorts",
                  },
                  shirtsAndTops: {
                    text: "Shirts & Tops",
                    path: "/shop/men/basketball/shirts_and_tops",
                  },
                },
              },
            },
          },
        },
      },
      women: {
        text: "WOMEN",
        path: "/shop/women",
        category: {
          all: {
            text: "All Women's Products",
            path: "/shop/women",
            isAllAudienceProductsLink: true,
          },
          shoes: {
            text: "Shoes",
            path: "/shop/women/shoes",
            productType: {
              all: {
                text: "All Women's Shoes",
                path: "/shop/women/shoes",
              },
              running: {
                text: "Running",
                path: "/shop/women/shoes/running",
              },
              soccer: {
                text: "Soccer",
                path: "/shop/women/shoes/soccer",
              },
              basketball: {
                text: "Basketball",
                path: "/shop/women/shoes/basketball",
              },
            },
          },
          clothing: {
            text: "Clothing",
            path: "/shop/women/clothing",
            productType: {
              all: {
                text: "All Women's Clothing",
                path: "/shop/women/clothing",
              },
              pants: {
                text: "Pants",
                path: "/shop/women/clothing/pants",
              },
              shorts: {
                text: "Shorts",
                path: "/shop/women/clothing/shorts",
              },
              shirtsAndTops: {
                text: "Shirts & Tops",
                path: "/shop/women/clothing/shirts_and_tops",
              },
            },
          },
          accessories: {
            text: "Accessories",
            path: "/shop/women/accessories",
            productType: {
              all: {
                text: "All Women's Accessories",
                path: "/shop/women/accessories",
              },
              hats: {
                text: "Hats",
                path: "/shop/women/accessories/hats",
              },
              socks: {
                text: "Socks",
                path: "/shop/women/accessories/socks",
              },
              belts: {
                text: "Belts",
                path: "/shop/women/accessories/belts",
              },
            },
          },
        },
      },
      kids: {
        text: "KIDS",
        path: "/shop/kids",
        category: {
          all: {
            text: "All Kids Products",
            path: "/shop/kids",
            isAllAudienceProductsLink: true,
          },
          shoes: {
            text: "Shoes",
            path: "/shop/kids/shoes",
            productType: {
              all: {
                text: "All Kids Shoes",
                path: "/shop/kids/shoes",
              },
              running: {
                text: "Running",
                path: "/shop/kids/shoes/running",
              },
              soccer: {
                text: "Soccer",
                path: "/shop/kids/shoes/soccer",
              },
              basketball: {
                text: "Basketball",
                path: "/shop/kids/shoes/basketball",
              },
            },
          },
          clothing: {
            text: "Clothing",
            path: "/shop/kids/clothing",
            productType: {
              all: {
                text: "All Kids Clothing",
                path: "/shop/kids/clothing",
              },
              pants: {
                text: "Pants",
                path: "/shop/kids/clothing/pants",
              },
              shorts: {
                text: "Shorts",
                path: "/shop/kids/clothing/shorts",
              },
              shirtsAndTops: {
                text: "Shirts & Tops",
                path: "/shop/kids/clothing/shirts_and_tops",
              },
            },
          },
          accessories: {
            text: "Accessories",
            path: "/shop/kids/accessories",
            productType: {
              all: {
                text: "All Kids Accessories",
                path: "/shop/kids/accessories",
              },
              hats: {
                text: "Hats",
                path: "/shop/kids/accessories/hats",
              },
              socks: {
                text: "Socks",
                path: "/shop/kids/accessories/socks",
              },
              belts: {
                text: "Belts",
                path: "/shop/kids/accessories/belts",
              },
            },
          },
        },
      },
    },
  };
}

export function iconNav(): NavItem[] {
  return [
    {
      text: "Search",
      icon: "search-line",
      path: "search",
    },
    {
      text: "Shopping Bag",
      icon: "shopping-bag-line",
      path: "shopping-bag",
    },
    {
      text: "User Account",
      icon: "user-line",
      path: "user-account",
    },
  ];
}

export function companyInfoNav(): NavItem[] {
  return [
    {
      text: "COMPANY INFO",
      path: "company-info",
      subnav: [
        {
          text: "About Us",
          path: "about-us",
        },
        {
          text: "Contact Us",
          path: "contact-us",
        },
        {
          text: "Shipping & Delivery Policies",
          path: "shipping-and-delivery-policies",
        },
        {
          text: "Returns, Exchanges, Refunds",
          path: "returns-exchanges-refunds",
        },
        {
          text: "FAQ",
          path: "faq",
        },
        {
          text: "Privacy Policy",
          path: "privacy-policy",
        },
        {
          text: "Terms of Service",
          path: "terms-of-service",
        },
      ],
    },
  ];
}

// Combine all the navigation arrays into a single navigation array.
export function combinedNav(): NavItem[] {
  return [...topNav(), ...iconNav(), ...companyInfoNav()];
}
