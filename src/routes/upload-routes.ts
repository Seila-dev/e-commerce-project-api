import { UploadController } from "../http/controllers/upload-controller"
import { Router } from 'express'
import multer from 'multer'

const uploadRoutes = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage })

uploadRoutes.post("/", upload.single('file'), new UploadController().upload)

export default uploadRoutes