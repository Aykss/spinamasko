// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-plugin-prettier'

export default withNuxt(
   {
    files: ["server/**/*.ts"], // ✅ only check TS files in server/
    plugins: { prettier },
  },
  {
    files: ["components/**/*.vue"], // ✅ only check Vue files in components/
    plugins: { prettier },
  },
  {
    files: ["test/**/*.ts"], // ✅ only check TS files in server/
    plugins: { prettier },
  },
)