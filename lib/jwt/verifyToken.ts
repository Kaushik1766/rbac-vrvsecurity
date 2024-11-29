import { UserJWT } from "@/app/types/UserJWT";
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_KEY

export async function verifyToken(token: string) {
    if (!secret || secret.length == 0) throw new Error("JWT secret key not found");
    try {
        const payload = await jwtVerify(token, new TextEncoder().encode(secret));
        return payload.payload as UserJWT;
    } catch (error) {
        throw new Error('Invalid token');
    }
}