// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-auth-utils", "@nuxt/test-utils/module", "@nuxt/eslint"],
  eslint: {
    checker: true,
  },
  typescript: {
    tsConfig: {
      include: ["../test/unit/**/*", "../test/integration/**/*"],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["../app/tailwind.css"],
});
