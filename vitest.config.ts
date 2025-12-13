import "dotenv/config";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    globals: true,
    projects: [
      await defineVitestProject({
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      }),
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
      await defineVitestProject({
        test: {
          name: "integration",
          include: ["test/integration/*.{test,spec}.ts"],
          environment: "node",
        },
      }),
    ],
  },
});
