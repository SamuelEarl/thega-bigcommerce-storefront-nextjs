# THEGA SPORTSWEAR - Medusa.js Storefront Next.js

UPDATE: I am going to use Medusa.js instead of BigCommerce for the ecommerce platform. I will use an Amazon Seller account that is integrated with Printful for marketing and market research to learn which products sell well. Once I have a good idea of what sells, then I will purchase small quantities and sell them directly through my Medusa.js store.

---

## Install the BigCommerce Docs MCP Server

The BigCommerce Docs MCP Server allows your AI Agent to reference the BigCommerce documentation while coding on this project.

Go to of the docs pages (https://docs.bigcommerce.com/) and click the dropdown arrow next to the "Copy page" button (to the right of the page title) and select "Connect to Claude Code". That will copy the following command to your clipboard:

```bash
claude mcp add --transport http docs-bigcommerce-com https://docs.bigcommerce.com/_mcp/server
```

Paste that command into your Claude Code terminal and run it. Claude will install a configuration entry locally in `~/.claude.json`. Specifically, it's stored under a section that is specific to your project folder:

```json
"/absolute/path/to/my/project": {
  "allowedTools": [],
  "mcpContextUris": [],
  "mcpServers": {
    "docs-bigcommerce-com": {
      "type": "http",
      "url": "https://docs.bigcommerce.com/_mcp/server"
    }
  },
  ...
}
```

So when your run `claude mcp add --transport http`, it creates a Claude configuration entry in your `~/.claude.json` file, scopes that entry to your current project directory, and populates an `mcpServers` configuration with the `"docs-bigcommerce-com"` MCP server configuration. So if you ever change your project folder location on your computer, then you will probably need to run the command again so the MCP server configuration is scoped to your updated project directory.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
