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

export function topNav(): NavItem[] {
  return [
    {
      text: "MEN",
      path: "/shop?audience=men",
      subnav: [
        {
          text: "All Men's Products",
          path: "/shop?audience=men",
          isAllAudienceProductsLink: true,
        },
        {
          text: "Shoes",
          path: "/shop?audience=men&category=shoes",
          subnav: [
            {
              text: "All Men's Shoes",
              path: "/shop?audience=men&category=shoes",
            },
            {
              text: "Running",
              path: "/shop?audience=men&category=shoes&sport=running",
            },
            {
              text: "Soccer",
              path: "/shop?audience=men&category=shoes&sport=soccer",
            },
            {
              text: "Basketball",
              path: "/shop?audience=men&category=shoes&sport=basketball",
            },
          ],
        },
        {
          text: "Clothing",
          path: "/shop?audience=men&category=clothing",
          subnav: [
            {
              text: "All Men's Clothing",
              path: "/shop?audience=men&category=clothing",
            },
            {
              text: "Pants",
              path: "/shop?audience=men&category=clothing&subCategory=pants",
            },
            {
              text: "Shorts",
              path: "/shop?audience=men&category=clothing&subCategory=shorts",
            },
            {
              text: "Shirts & Tops",
              path: `/shop?audience=men&category=clothing&subCategory=${encodeURIComponent("shirts-&-tops")}`,
            },
          ],
        },
        {
          text: "Accessories",
          path: "/shop?audience=men&category=accessories",
          subnav: [
            {
              text: "All Men's Accessories",
              path: "/shop?audience=men&category=accessories",
            },
            {
              text: "Hats",
              path: "/shop?audience=men&category=accessories&subCategory=hats",
            },
            {
              text: "Socks",
              path: "/shop?audience=men&category=accessories&subCategory=socks",
            },
            {
              text: "Belts",
              path: "/shop?audience=men&category=accessories&subCategory=belts",
            },
          ],
        },
      ],
    },
    {
      text: "WOMEN",
      path: "/shop?audience=women",
      subnav: [
        {
          text: "All Women's Products",
          path: "/shop?audience=women",
          isAllAudienceProductsLink: true,
        },
        {
          text: "Shoes",
          path: "/shop?audience=women&category=shoes",
          subnav: [
            {
              text: "All Women's Shoes",
              path: "/shop?audience=women&category=shoes",
            },
            {
              text: "Running",
              path: "/shop?audience=women&category=shoes&sport=running",
            },
            {
              text: "Soccer",
              path: "/shop?audience=women&category=shoes&sport=soccer",
            },
            {
              text: "Basketball",
              path: "/shop?audience=women&category=shoes&sport=basketball",
            },
          ],
        },
        {
          text: "Clothing",
          path: "/shop?audience=women&category=clothing",
          subnav: [
            {
              text: "All Women's Clothing",
              path: "/shop?audience=women&category=clothing",
            },
            {
              text: "Pants",
              path: "/shop?audience=women&category=clothing&subCategory=pants",
            },
            {
              text: "Shorts",
              path: "/shop?audience=women&category=clothing&subCategory=shorts",
            },
            {
              text: "Shirts & Tops",
              path: `/shop?audience=women&category=clothing&subCategory=${encodeURIComponent("shirts-&-tops")}`,
            },
          ],
        },
        {
          text: "Accessories",
          path: "/shop?audience=women&category=accessories",
          subnav: [
            {
              text: "All Women's Accessories",
              path: "/shop?audience=women&category=accessories",
            },
            {
              text: "Hats",
              path: "/shop?audience=women&category=accessories&subCategory=hats",
            },
            {
              text: "Socks",
              path: "/shop?audience=women&category=accessories&subCategory=socks",
            },
            {
              text: "Belts",
              path: "/shop?audience=women&category=accessories&subCategory=belts",
            },
          ],
        },
      ],
    },
    {
      text: "KIDS",
      path: "/shop?audience=kids",
      subnav: [
        {
          text: "All Kids Products",
          path: "/shop?audience=kids",
          isAllAudienceProductsLink: true,
        },
        {
          text: "Shoes",
          path: "/shop?audience=kids&category=shoes",
          subnav: [
            {
              text: "All Kids Shoes",
              path: "/shop?audience=kids&category=shoes",
            },
            {
              text: "Running",
              path: "/shop?audience=kids&category=shoes&sport=running",
            },
            {
              text: "Soccer",
              path: "/shop?audience=kids&category=shoes&sport=soccer",
            },
            {
              text: "Basketball",
              path: "/shop?audience=kids&category=shoes&sport=basketball",
            },
          ],
        },
        {
          text: "Clothing",
          path: "/shop?audience=kids&category=clothing",
          subnav: [
            {
              text: "All Kids Clothing",
              path: "/shop?audience=kids&category=clothing",
            },
            {
              text: "Pants",
              path: "/shop?audience=kids&category=clothing&subCategory=pants",
            },
            {
              text: "Shorts",
              path: "/shop?audience=kids&category=clothing&subCategory=shorts",
            },
            {
              text: "Shirts & Tops",
              path: `/shop?audience=kids&category=clothing&subCategory=${encodeURIComponent("shirts-&-tops")}`,
            },
          ],
        },
        {
          text: "Accessories",
          path: "/shop?audience=kids&category=accessories",
          subnav: [
            {
              text: "All Kids Accessories",
              path: "/shop?audience=kids&category=accessories",
            },
            {
              text: "Hats",
              path: "/shop?audience=kids&category=accessories&subCategory=hats",
            },
            {
              text: "Socks",
              path: "/shop?audience=kids&category=accessories&subCategory=socks",
            },
            {
              text: "Belts",
              path: "/shop?audience=kids&category=accessories&subCategory=belts",
            },
          ],
        },
      ],
    },
  ];
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
