import { Godparents } from "~~/prisma/generated/prisma/client"

export type AuthGodparent = {
    id: number,
    email: string,
    name: string,
    unique_id: string
}

export type AuthResponse = {
    success: boolean,
    godparent?: AuthGodparent
    message?: string
}

export type TestBody = {
    email: string,
    password: string,
    name: string
}

export type TestResponse = {
    success: boolean,
    body: TestBody
}