import { Request, Response } from "express"
import { prisma } from "../../prisma/prisma"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class UsersController {
    async create(request: Request, response: Response) {
        try {
            const { email, firstName, lastName, passwordHash } = request.body

            const user = await prisma.ecommerceUser.findUnique({
                where: {
                    email
                }
            })

            if (user) {
                response.status(404).json({ error: 'User already exists' })
                return
            }

            const hashedPassword = await bcrypt.hash(passwordHash, 10)

            const newUser = await prisma.ecommerceUser.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    passwordHash: hashedPassword
                }
            })

            response.status(201).json({ newUser, message: 'User created' })
        } catch (error) {
            response.status(500).send({ message: "Internal server error" })
        }
    }

    async login(request: Request, response: Response) {
        const { email, passwordHash } = request.body

        try {
            const user = await prisma.ecommerceUser.findUnique({
                where: {
                    email
                }
            })

            if(user && bcrypt.compareSync(passwordHash, user.passwordHash)) {
                const token = jwt.sign({id: user.id}, "meysecretkey", { expiresIn: '1h'})
                response.json({ token })
            }

            response.status(401).json({ message: "Invalid credentials"})
        } catch (error) {
            response.status(500).send({ message: "Internal server error"})
        }
    }

    async profile(request: Request, response: Response) {
        response.json(request.user)
    }
}