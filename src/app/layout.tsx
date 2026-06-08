import type { Metadata } from "next";
import BaseLayout from "@/layouts/base-layout";
import "@/assets/styles/main.css";

export const metadata: Metadata = {
  title: "THEGA SPORTSWEAR",
  description: "For those who live and breathe sports and fitness—THE GAME IS LIFE, and our gear powers every step forward.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    // The CSS property `scroll-behavior: smooth;` prevents NextJS from scrolling all the way to the top of the page on page transitions. 
    // However, setting `data-scroll-behavior="smooth"` on the html element disables the CSS `scroll-behavior: smooth;` property on page transitions, so the pages will scroll all the way to the top of the page on page transitions.
    <html lang="en" data-scroll-behavior="smooth">
      <body className="body" suppressHydrationWarning>
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}
