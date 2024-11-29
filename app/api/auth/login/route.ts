import prisma from '@/lib/db'
import { cookies } from 'next/headers'
import z from 'zod'
import bcrypt from 'bcrypt'
import { NextRequest } from 'next/server';
import { createToken } from '@/lib/jwt/createToken';

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const secret = process.env.JWT_SECRET
const alg = 'HS256'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const valid = schema.safeParse(data)
    const cookieStore = await cookies()

    // checking parameters
    if (!valid.success) {
        return Response.json({ error: "Invalid parameters" }, { status: 400 })
    }
    try {

        // fetching user record if it exists
        const user = await prisma.user.findUnique({
            where: {
                email: valid.data.email
            }
        })

        // if user not found throw error
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 })
        }

        // comparing hashed password
        const checkPassword = await bcrypt.compare(valid.data.password, user.password)
        if (!checkPassword) {
            return Response.json({ error: "Invalid password" }, { status: 401 })
        }

        // creating JWT token
        const jwt = await createToken(user.email, user.id, user.name, user.role)
        cookieStore.set("user-token", jwt) // returning jwt token in cookie

        return Response.json({ message: "Logged in successfully" }, { status: 200 })
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 })
    }

}