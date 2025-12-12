/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{ts,tsx,js,jsx}": (filenames) => [
    `prettier -w ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
  "*.{ts,tsx}": (filenames) => [
    `prettier -w ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
};
