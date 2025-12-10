import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { prisma } from '../../server/database'
import { AuthResponse, TestBody, TestResponse } from '../../server/utils/types'

describe("Authentication API integration", async () => {
    await setup({
        rootDir: process.cwd(),
    })

    beforeAll(async () => {
        await prisma.godparents.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    // test("signup should create a godparent and return a session", async () => {
    //     const res: AuthResponse = await $fetch("/api/auth/signup", {
    //         method: "POST",
    //         body: {
    //             email: "test@example.com",
    //             password: "password123",
    //             name: "Tester"
    //         },
    //         headers: { "Content-Type": "application/json" }
    //     })

    //     expect(res.success).toBe(true)
    //     // expect(res.godparent?.email).toEqual("test@example.com")
    // })

    // test("login should succeed with correct credentials", async () => {
    //     const res: AuthResponse = await $fetch("/api/auth/login", {
    //         method: 'POST',
    //         body: {
    //             email: "test@example.com",
    //             password: "password123",
    //         }
    //     })
    // })

    test("display hello", async () => {
        const res: TestResponse = await $fetch("/api/auth/hello", {method: "POST", body: {
                email: "test@example.com",
                password: "password123",
                name: "Tester"
            }})
        expect(res.success).toBe(true)
        expect(res.body).toEqual({
            email: "test@example.com",
            password: "password123",
            name: "Tester"
        } as TestBody)
    })
})