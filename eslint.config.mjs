import pluginJs from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  pluginJs.configs.recommended,
  ...compat.extends('eslint-config-standard')
]
