import { Router } from "express";
import { SizesController } from "../http/controllers/sizes-controller";

const sizesRoutes = Router()

sizesRoutes.get("/", new SizesController().findAll)
sizesRoutes.get("/:id", new SizesController().findOne)
sizesRoutes.post("/", new SizesController().create)
sizesRoutes.delete("/:id", new SizesController().destroy)
sizesRoutes.put("/:id", new SizesController().update)


export default sizesRoutes