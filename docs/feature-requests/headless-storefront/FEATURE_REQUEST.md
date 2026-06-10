# Feature Request: Headless Storefront for THEGA SPORTSWEAR

I need to create a custom headless storefront for livethega.com. It should be built using Next.js. The storefront should be able to display and sell products from a BigCommerce admin store.

I want to be able to add and remove filters on the /src/app/shop/page.tsx page. These filters need to then pull the matching products from my BigCommerce admin store.

This website uses a mega menu to navigate to the store and to filter products.

I have a dummy navigation menu outlined in the src/navigation.ts file. This is only a placeholder and will likely need to change based on how the filtering should be handled in the /src/app/shop/page.tsx page. In relation to how the store navigation and filtering should work, maybe the Adidas website at https://www.adidas.com/us could be a good example to follow. 

## Possible solutions for store navigation and filtering

These are only ideas and are not set in stone. If you think there is a better way to handle this, then I'm open to suggestions.

### Two layer solution idea

We could possibly split storefront navigation and filters into two layers.

The `/shop` page treats hierarchical category navigation (audience → apparel → piece) and orthogonal facet refinement (color, size, …) as two distinct concerns with separate URL conventions and separate UI affordances.

- **Layer 1 — Category navigation.** Path-shaped URLs (`/shop/men/clothing/pants`), backed by BigCommerce Product Categories, surfaced via the mega menu and breadcrumb. One position in the tree at a time; removing a level pops up to the parent.
- **Layer 2 — Facet filters.** Query-param URLs (`?color=red&size=M`), backed by BigCommerce Product Options, surfaced via a sidebar and the chip strip in `product-filter-tags.tsx`. Multiple independent toggles; removing one drops that constraint.

Conflating both into removable chips (the original `product-filter-tags.tsx` model) produces incoherent UX: removing a parent category like `clothing` while a child like `pants` survives is semantically meaningless, because the child only exists in the context of its parent. Does Adidas, the visual reference, use the same two-layer split? The separation also allow path URLs to stay stable, cacheable, and SEO-indexed while facet URLs stay user-state-y and noindex.

### Search query solution idea

We could use the search query params to display the products that match the search query. The current navigation and filtering in the /src/app/shop/[[...categories]]/page.tsx page is a good example of how this could work. I think this could work because each level in the navigation is simply treated as another search query param and can be removed independently. I think this is how Amazon.com handles navigation and filtering, but I could be wrong about that.

Refer to how the URL is constructed in the /src/navigation.ts file and how it works in the /src/app/shop/[[...categories]]/page.tsx page.
