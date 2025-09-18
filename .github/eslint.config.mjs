import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-undef": "off",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": "error",
      "no-console": "warn",
      "no-extra-semi": "error",
      "max-len": ["error", { code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-mixed-spaces-and-tabs": "error",
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "padded-blocks": ["error", "never"],
    },
    linterOptions: {
      noInlineConfig: true
    }
  }
];
