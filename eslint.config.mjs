import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  // This applies to all your JS files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Keep browser for your frontend
        ...globals.node, // ADD THIS: Enables Node.js global variables
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error", // This will catch missing imports/variables
      "no-unused-vars": "warn", // This catches imports you didn't use
      "react/react-in-jsx-scope": "off", // Not needed in modern React
    },
  },
  // Keep your React specific rules
  pluginReact.configs.flat.recommended,
];
