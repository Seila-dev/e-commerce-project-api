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
            const { name, ean, price, description, highlight, categoryId, sizeId, colorId, rating, discount } = request.body

            const product = await prisma.product.create({
                data: {
                    image: filePath,
                    name,
                    description,
                    categoryId: parseInt(categoryId),
                    sizeId: parseInt(sizeId),
                    colorId: parseInt(colorId),
                    price,
                    rating,
                    discount,
                    highlight: Boolean(highlight),
                    ean
                },
                include: {
                    categories: true,
                    colors: true,
                    sizes: true
                }
            })
            response.status(201).json(product)
        } catch (error) {
            console.log(error)
            response.status(400).send({ message: "Houve um erro no try" })
        }


    }
}