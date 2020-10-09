module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		project: './tsconfig.json',
	},
	'plugins': [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier'
	],
	'rules': {
		'prettier/prettier': 'error',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};