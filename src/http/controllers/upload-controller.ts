import { Request, Response } from "express"



export class UploadController {
    async upload(request: Request, response: Response) {
        if (request.file) {
            response.json({
                message: "File uploaded",
                file: request.file
            })
        } else {
            response.status(400).json({
                message: "No file uploaded"
            })
        }
    }
}