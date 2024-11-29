import prisma from '@/lib/db'
import z from 'zod'
import bcrypt from 'bcrypt'
import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt/verifyToken'

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export async function POST(request: NextRequest) {
    const data = await request.json()
    const valid = schema.safeParse(data)

    // checking if user is already logged in
    const curToken = request.cookies.get("user-token")?.value
    try {
        const validToken = curToken && (await verifyToken(curToken))
        if (validToken) {
            return Response.json({ message: "Already logged in" }, { status: 200 })
        }
    }
    catch (e: any) {
        console.error(e.message)
    }


    if (!valid.success) {
        return Response.json(
            { error: "Invalid request parameters" },
            { status: 400 }
        )
    }
    try {
        // checking if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: valid.data.email
            }
        })
        if (user) {
            return Response.json({ error: "User already exists" }, { status: 400 })
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(valid.data.password, 10)

        // creating user record
        await prisma.user.create({
            data: {
                role: valid.data.email === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER', // assigning role based on email, default is USER, MODERATOR role can be given by admin
                name: valid.data.name,
                email: valid.data.email,
                password: hashedPassword,
            }
        })
        return Response.json({ message: "User created successfully, please login to continue" }, { status: 200 })
    }
    catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 })
    }
}