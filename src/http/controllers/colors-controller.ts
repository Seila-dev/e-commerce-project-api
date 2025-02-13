import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma';

export class ColorsController {
    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const colors = await prisma.color.findMany({
                orderBy: {
                    name: 'desc'
                }
            })

            response.status(200).json(colors)
        } catch (error) {
            response.status(400).send({ message: "Error on finding colors"})
        }
    }
    async findOne(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            const color = await prisma.color.findUnique({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).json(color)
        } catch (error) {
            response.status(400).send({ message: "Error on finding color"})
        }
    }
    async create(request: Request, response: Response): Promise<void> {
        const { name } = request.body
        try {
            const color = await prisma.color.create({
                data: {
                    name
                }
            })

            response.status(201).json(color)
        } catch (error) {
            response.status(400).send({ message: "Error on creating new color"})
        }
    }
    async destroy(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            await prisma.color.delete({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).send({ message: "Color deleted successfully"})
        } catch (error) {
            response.status(400).send({ message: "Error on deleting color"})
        }
    }
    async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        const { name } = request.body
        try {
            const color = await prisma.color.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name
                }
            })

            response.status(200).json(color)
        } catch (error) {
            response.status(400).send({ message: "Error on updating color"})
        }
    }
}