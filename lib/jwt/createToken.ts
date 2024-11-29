import { SignJWT } from "jose";
import type { UserJWT } from "@/app/types/UserJWT";
import prisma from "../db";


const secret = process.env.JWT_KEY
const alg = 'HS256'

export async function createToken(email: string, id: string, name: string, role: string) {
    if (!secret || secret.length == 0) throw new Error("No jwt secret token found")

    const payload: UserJWT = {
        email: email,
        id: id,
        name: name,
        role: role
    }
    try {
        // creating jwt token
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('1h') // setting expiration time of jwt to 1 hour, thus making it short lived because we are storing roles in the jwt
            .sign(new TextEncoder().encode(secret))
        return token
    }
    catch (e: any) {
        throw new Error(e.message)
    }
}