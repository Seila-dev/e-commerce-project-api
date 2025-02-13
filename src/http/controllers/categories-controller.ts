import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma';

export class CategoriesController {
    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const categories = await prisma.category.findMany({
                orderBy: {
                    name: 'asc'
                }
            })

            response.status(200).json(categories)
        } catch (error) {
            response.status(400).send({ message: "Error on finding categories"})
        }
    }
    async findOne(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            const category = await prisma.category.findUnique({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).json(category)
        } catch (error) {
            response.status(400).send({ message: "Error on finding category"})
        }
    }
    async create(request: Request, response: Response): Promise<void> {
        const { name } = request.body
        try {
            const category = await prisma.category.create({
                data: {
                    name
                }
            })

            response.status(201).json(category)
        } catch (error) {
            response.status(400).send({ message: "Error on creating category"})
        }
    }
    async destroy(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        try {
            await prisma.category.delete({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).send({ message: "Category deleted successfully"})
        } catch (error) {
            response.status(400).send({ message: "Error on deleting category"})
        }
    }
    async update(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        const { name } = request.body
        try {
            const category = await prisma.category.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name
                }
            })

            response.status(200).json(category)
        } catch (error) {
            response.status(400).send({ message: "Error on updating category"})
        }
    }
}