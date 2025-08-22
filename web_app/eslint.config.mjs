import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // --- ADD THIS CONFIGURATION OBJECT ---
  // This changes critical errors into non-blocking warnings.
  {
    rules: {
      // --- CRITICAL ERRORS CHANGED TO WARNINGS ---
      
      // Will now only WARN you about using 'any' instead of stopping the build.
      "@typescript-eslint/no-explicit-any": "warn",

      // Will now only WARN you about unescaped characters.
      "react/no-unescaped-entities": "warn",
      
      // --- EXISTING WARNINGS ---
      
      // This rule already defaults to a warning, but you can be explicit.
      // It's good to keep this on to encourage clean code.
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];

export default eslintConfig;