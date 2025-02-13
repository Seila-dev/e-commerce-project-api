import { Router } from "express";
import { CategoriesController } from "../http/controllers/categories-controller";

const categoriesRoutes = Router()

categoriesRoutes.get("/", new CategoriesController().findAll)
categoriesRoutes.get("/:id", new CategoriesController().findOne)
categoriesRoutes.post("/", new CategoriesController().create)
categoriesRoutes.delete("/:id", new CategoriesController().destroy)
categoriesRoutes.put("/:id", new CategoriesController().update)


export default categoriesRoutes