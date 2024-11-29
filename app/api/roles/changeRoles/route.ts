import prisma from '@/lib/db'
import z from 'zod'
import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt/verifyToken'

const schema = z.object({
    email: z.string().email(),
    role: z.enum(['ADMIN', 'USER', 'MODERATOR']),
})

export async function POST(request: NextRequest) {
    const data = await request.json()
    const valid = schema.safeParse(data)

    // checking if user is logged in
    const curToken = request.cookies.get("user-token")?.value
    if (!curToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }


    // check if user is admin or moderator
    try {
        const validToken = await verifyToken(curToken)
        if (validToken && validToken.role !== 'ADMIN' && validToken.role !== 'MODERATOR') {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
    }
    catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 })
    }

    if (!valid.success) {
        return Response.json(
            { error: "Invalid request parameters" },
            { status: 400 }
        )
    }

    try {

        // check if email is of site owner
        if (valid.data?.email === process.env.ADMIN_EMAIL) {
            return Response.json({ error: "Cannot change role of site owner" }, { status: 400 })
        }


        // fetching user record if it exists
        const user = await prisma.user.findUnique({
            where: {
                email: valid.data?.email
            }
        })

        // if user not found throw error
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 })
        }

        // updating role
        const updatedUser = await prisma.user.update({
            where: {
                email: valid.data?.email
            },
            data: {
                role: valid.data?.role
            }
        })
        return Response.json({
            message: "Role updated successfully"
        }, { status: 200 })

    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 })
    }
}