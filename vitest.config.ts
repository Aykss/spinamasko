import 'dotenv/config'
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, '../../')
    }
  },
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/{e2e,unit}/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
      await defineVitestProject({
        test: {
          name: 'integration',
          include: ['test/integration/*.{test,spec}.ts'],
          environment: 'node'
        }
      })
    ],
  },
})
