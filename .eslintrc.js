module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            arrowFunctions: true,
        },
        project: ["./packages/*/tsconfig.json"],
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        // Existing rules
        "comma-dangle": "off", // https://eslint.org/docs/rules/comma-dangle
        "function-paren-newline": "off", // https://eslint.org/docs/rules/function-paren-newline
        "global-require": "off", // https://eslint.org/docs/rules/global-require
        "import/no-dynamic-require": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
        "no-inner-declarations": "off", // https://eslint.org/docs/rules/no-inner-declarations
        // New rules
        "class-methods-use-this": "off",
        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-empty-interface": [
            "error",
            {
                allowSingleExtends: true,
            },
        ],
        "react/react-in-jsx-scope": "off",
    },
};
