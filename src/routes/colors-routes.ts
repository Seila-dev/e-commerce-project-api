import { Router } from "express";
import { ColorsController } from "../http/controllers/colors-controller";

const colorsRoutes = Router()

colorsRoutes.get("/", new ColorsController().findAll)
colorsRoutes.get("/:id", new ColorsController().findOne)
colorsRoutes.post("/", new ColorsController().create)
colorsRoutes.delete("/:id", new ColorsController().destroy)
colorsRoutes.put("/:id", new ColorsController().update)


export default colorsRoutes