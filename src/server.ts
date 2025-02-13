import { app } from "./app"
import productsRoutes from "./routes/products-routes"
import express from 'express'
import uploadRoutes from "./routes/upload-routes"
import path from 'path'
import usersRoutes from "./routes/users-routes"
import categoriesRoutes from "./routes/categories-routes"
import colorsRoutes from "./routes/colors-routes"
import sizesRoutes from "./routes/sizes-routes"

const port = 3000

const publicPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(publicPath));

app.listen(port, () => {
    console.log('HTTP Server Running!')
})

app.use('/products', productsRoutes)
app.use('/upload', uploadRoutes)
app.use('/users', usersRoutes)
app.use('/categories', categoriesRoutes)
app.use('/colors', colorsRoutes)
app.use('/sizes', sizesRoutes)