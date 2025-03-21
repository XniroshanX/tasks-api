import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist", "webpack.config.js"] },
  { files: ["**/*.{cjs,ts}"] },
  { files: ["**/*.{cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
]);
