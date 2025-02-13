import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma';

export class SizesController {
    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const sizes = await prisma.size.findMany()

            response.status(200).json(sizes)
        } catch (error) {
            response.status(400).send({ message: "Error on finding sizes"})
        }
    }
    async findOne(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            const size = await prisma.size.findUnique({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).json(size)
        } catch (error) {
            response.status(400).send({ message: "Error on finding size"})
        }
    }
    async create(request: Request, response: Response): Promise<void> {
        const { name } = request.body
        try {
            const size = await prisma.size.create({
                data: {
                    name
                }
            })

            response.status(201).json(size)
        } catch (error) {
            response.status(400).send({ message: "Error on creating new size"})
        }
    }
    async destroy(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            await prisma.size.delete({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).send({ message: "Size deleted successfully"})
        } catch (error) {
            response.status(400).send({ message: "Error on deleting size"})
        }
    }
    async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        const { name } = request.body
        try {
            const size = await prisma.size.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name
                }
            })

            response.status(200).json(size)
        } catch (error) {
            response.status(400).send({ message: "Error on updating size"})
        }
    }
}