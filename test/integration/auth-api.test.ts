import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { DB } from '../../lib/database'
import { AuthError, AuthResponse } from '../../server/utils/types'

describe("Authentication API integration", async () => {
    await setup({
        rootDir: process.cwd(),
    })

    beforeAll(async () => {
        await DB.godparents.deleteMany()
    })

    afterAll(async () => {
        await DB.$disconnect()
    })

    test("signup should create a godparent and return a session", async () => {
        const res: AuthResponse = await $fetch("/api/auth/signup", {
            method: "POST",
            body: {
                email: "test@example.com",
                password: "password123",
                name: "Tester"
            },
        })

        expect(res.success).toBe(true)
        expect(res.godparent?.email).toEqual("test@example.com")
    })

    test("signup should not create a godparent with existing email", async() => {
        let error: AuthError | null = null
        try{
            await $fetch("/api/auth/signup", {
                method: "POST",
                body: {
                    email: "test@example.com",
                    password: "password123",
                    name: "Tester"
                },
                headers: { "Content-Type": "application/json" }
            })
        } catch(e: any) {
            error = {
                statusCode: e.statusCode,
                statusMessage: e.statusMessage
            }
        }
        expect(error).not.toBeNull()
        expect(error?.statusCode).toBe(409)
        expect(error?.statusMessage).toBe("Email is already in use")
    })

    test("login should not succeed with wrong credentials", async() => {
        let error: AuthError | null = null
        try{
            await $fetch("/api/auth/login", {
                method: 'POST',
                body: {
                    email: "test@example.com",
                    password: "password12354",
                }
            })
        } catch(e: any) {
            error = {
                statusCode: e.statusCode,
                statusMessage: e.statusMessage
            }
        }
        expect(error).not.toBeNull()
        expect(error?.statusCode).toBe(401)
        expect(error?.statusMessage).toBe("Invalid Credentials")
    })

    test("login should succeed with correct credentials", async () => {
        const res: AuthResponse = await $fetch("/api/auth/login", {
            method: 'POST',
            body: {
                email: "test@example.com",
                password: "password123",
            }
        })

        expect(res.success).toBe(true)
        expect(res.godparent?.email).toEqual("test@example.com")
    })

    test("login should create a session cookie", async () => {
        let cookie: string | null = null

        const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email: "test@example.com", password: "password123" },
        headers: { "Content-Type": "application/json" },
            onResponse({ response }) {
                cookie = response.headers.get("set-cookie")
            }
        })

        expect(res.success).toBe(true)
        expect(cookie).toContain("nuxt-session=")
    })
})