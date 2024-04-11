import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-undef": "off",
            quotes: ["error", "double"]
        },
        linterOptions: {
            noInlineConfig: true
        }
    }
];
