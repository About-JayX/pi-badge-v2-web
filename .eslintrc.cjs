module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import", "simple-import-sort"],
  rules: {
    "import/no-anonymous-default-export": "off",
    "import/no-unresolved": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-explicit-any":"off",
    "react-refresh/only-export-components":"off",
  },
};
