import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/prisma'

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {

    try {
        const token = request.headers['authorization']?.split(' ')[1]

        if (!token) {
            response.status(401).json({ message: 'Token not provided' })
            return
        }

        if (!process.env.secret_key) {
            response.status(500).json({ message: 'Secret key not defined' })
            return
        }

        const payload = jwt.verify(token, process.env.secret_key) as unknown as { id: number, email: string }

        const user = await prisma.ecommerceUser.findUnique({
            where: {
                id: payload.id
            }
        })

        if (!user) {
            response.status(401).json({ message: 'Unauthorized' })
            return
        }

        request.user = user

        next()
    } catch (error) {
        response.status(401).json({ message: 'Failed authenticate token' })
    }

}