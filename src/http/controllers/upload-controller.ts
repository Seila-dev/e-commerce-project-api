import { Request, Response } from "express"
import path from 'path'
import { prisma } from '../../prisma/prisma'
import axios from 'axios'


const IMGUR_CLIENT_ID = '673aa4e6cc5ef90'

export class UploadController {
    async upload(request: Request, response: Response): Promise<void> {
        if (!request.file) {
            response.status(400).json({ message: 'No file uploaded' });
            return
        }
        try {
            // const filePath = path.join(request.file.filename)
            const file = request.file
            const { name, ean, price, description, highlight, categoryId, sizeId, colorId } = request.body

            const imgurResponse = await axios.post(
                'https://api.imgur.com/3/image',
                {
                    image: file.buffer.toString('base64'),
                    type: 'base64'
                },
                {
                    headers: {
                        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                    },
                }
            )

            const imageUrl = imgurResponse.data.data.link;

            const product = await prisma.product.create({
                data: {
                    image: imageUrl,
                    name,
                    description,
                    categoryId: parseInt(categoryId),
                    sizeId: parseInt(sizeId),
                    colorId: parseInt(colorId),
                    price,
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