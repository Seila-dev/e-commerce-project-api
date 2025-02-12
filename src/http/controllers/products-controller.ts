// MVC - MODEL / VIEW / CONTROLLER
import { Request, Response } from "express"
import { prisma } from "../../prisma/prisma"

export class ProductsController {

    async findAll(request: Request, response: Response) {
        try {
            const products = await prisma.product.findMany({
                orderBy: {
                    name: "asc"
                },
                include: {
                    categories: true,
                    sizes: true,
                    colors: true
                }
            })
            response.send(products)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { ean, name, price, description, image, highlight, colorId, sizeId, categoryId } = request.body;

            const productAlreadyExists = await prisma.product.findFirst({
                where: { ean }
            })

            if (productAlreadyExists) {
                response.status(409).send({ message: "O produto já existe" });
                return
            }

            const product = await prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    image,
                    highlight,
                    colorId,
                    sizeId,
                    categoryId,
                    ean
                }
            });

            response.status(200).json(product);
        } catch (error: any) {
            console.log(error)
            response.status(500).send({ message: "Erro ao criar o produto." })
            // if (error.code === 'P2002') { // Código de erro para violação de chave única
            //     response.status(409).send({ message: "O produto com este nome já existe." });
            // } else {
            //     console.error(error);
            //     response.status(500).send({ message: "Erro ao criar o produto." });
            // }
        }
    }

    async update(request: Request, response: Response) {
        const { name, price, description, image, highlight, ean, colorId, sizeId, categoryId } = request.body;
        const { id } = request.params

        try {
            await prisma.product.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    price,
                    description,
                    image,
                    highlight,
                    colorId,
                    sizeId,
                    categoryId,
                    ean
                }
            })

            response.status(200).send({ message: "Atualizado com sucesso" })
        } catch (error) {
            console.log('erro', error)
            response.status(500).send({ message: "Houve um erro" })
        }
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params

        try {
            await prisma.product.delete({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).send({ message: "Deletado com sucesso" })
        } catch (error) {
            console.log('erro', error)
            response.status(500).send({ message: "Houve um erro" })
        }
    }
}