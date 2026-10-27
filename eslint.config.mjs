// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/**
 * Architecture: which layer may import which.
 * Composition roots (main, app.config, app.component, core.providers) are left unclassified, so they may wire everything.
 */
const ELEMENTS = [
  { type: 'model', pattern: 'src/app/core/models' },
  { type: 'port', pattern: 'src/app/core/ports' },
  { type: 'use-case', pattern: 'src/app/core/use-cases' },
  { type: 'content', pattern: 'src/app/core/content' },
  { type: 'adapter', pattern: 'src/app/core/adapters' },
  { type: 'state', pattern: 'src/app/core/state' },
  { type: 'shared', pattern: 'src/app/shared' },
  { type: 'feature', pattern: 'src/app/features/*', capture: ['feature'] },
  { type: 'layout', pattern: 'src/app/layout/*', capture: ['part'] },
];

/** @param {string} type @param {string[]} allowed */
const may = (type, allowed) => ({
  from: { element: { type } },
  allow: { to: { element: { types: { anyOf: allowed } } } },
});

export default tseslint.config(
  { ignores: ['dist/', '.angular/', 'coverage/', 'node_modules/'] },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    processor: angular.processInlineTemplates,
    plugins: { boundaries },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/elements': ELEMENTS,
    },
    rules: {
      // Angular
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-signals': 'error',

      // General correctness
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['error'] }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      curly: ['error', 'multi-line'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

      // Cross-layer imports must use the path aliases, not ../../
      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['../*'], message: 'Use a path alias (@core, @shared, @features, @layout) instead.' }] },
      ],

      // Layer boundaries
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            may('model', ['model']),
            may('port', ['model']),
            may('use-case', ['model']),
            may('content', ['model']),
            may('adapter', ['model', 'port', 'content']),
            may('state', ['model', 'port', 'use-case', 'state']),
            may('shared', ['model', 'port', 'state', 'shared']),
            may('feature', ['model', 'port', 'state', 'shared']),
            may('layout', ['model', 'port', 'state', 'shared']),
            {
              from: { element: { type: 'feature' } },
              allow: {
                to: { element: { type: 'feature', captured: { feature: '{{ from.element.captured.feature }}' } } },
              },
            },
            {
              from: { element: { type: 'layout' } },
              allow: { to: { element: { type: 'layout', captured: { part: '{{ from.element.captured.part }}' } } } },
            },
          ],
        },
      ],
    },
  },
  {
    // Domain code stays framework-free.
    files: ['src/app/core/models/**/*.ts', 'src/app/core/use-cases/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@angular/*', 'rxjs', 'rxjs/*'], message: 'Domain code must not depend on a framework.' },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'boundaries/dependencies': 'off',
      // expect(obj.method).toHaveBeenCalled() is the normal way to assert on spies.
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
    },
  },
  {
    files: ['*.mjs', '*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
