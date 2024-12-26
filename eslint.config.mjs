import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended").map(config => ({
		...config,
		files: ["**/*.ts"],
	})),
	{
		files: ["**/*.ts"],

		plugins: {
			"@typescript-eslint": typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
		},

		rules: {
			indent: ["error", 2],
			quotes: ["error", "single"],
			semi: ["error", "always"],
			"no-unused-vars": "warn",
			eqeqeq: ["error", "always"],
			curly: ["error", "all"],

			"brace-style": ["error", "1tbs", {
				allowSingleLine: true,
			}],

			"comma-dangle": ["error", "always-multiline"],
			"object-curly-spacing": ["error", "always"],
			"array-bracket-spacing": ["error", "never"],
			"space-before-function-paren": ["error", "never"],

			"keyword-spacing": ["error", {
				before: true,
				after: true,
			}],

			"no-console": "off",
			"eol-last": ["error", "always"],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
];