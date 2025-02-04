import { Request, Response } from "express"
import path from 'path'
import { prisma } from '../../prisma/prisma'

export class UploadController {
    async upload(request: Request, response: Response): Promise<void> {
        if (!request.file) {
            response.status(400).json({ message: 'No file uploaded' });
            return
        }
        try {
            const filePath = path.join(request.file.filename)
            const { name, price, description, highlight, category_id, size_id, color_id } = request.body

            const product = await prisma.product.create({
                data: {
                    image: filePath,
                    name,
                    description,
                    category_id: parseInt(category_id),
                    size_id: parseInt(size_id),
                    color_id: parseInt(color_id),
                    price,
                    highlight: Boolean(highlight),
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            })
            response.status(201).json(product)
        } catch (error) {
            console.log(error)
            response.status(400).send({ message: "Houve um erro no try" })
        }


    }
}