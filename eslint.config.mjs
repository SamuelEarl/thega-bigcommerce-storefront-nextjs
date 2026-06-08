import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "no-unused-vars": "warn",
      "quotes": ["warn", "double"],
      "comma-dangle": ["warn", "always-multiline"],
      "semi": ["warn", "always"],
      "no-extra-semi": "warn",
      "brace-style": ["warn", "stroustrup"],
    },
  },
]);

export default eslintConfig;
