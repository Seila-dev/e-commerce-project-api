import { app } from "./app"
import productsRoutes from "./routes/products-routes"
import express from 'express'
import uploadRoutes from "./routes/upload-routes"
import path from 'path'

const port = 3000

const publicPath = path.join(process.cwd(), 'uploads'); // usando process.cwd() ao invés de __dirname
app.use('/uploads', express.static(publicPath));

app.listen(port, () => {
    console.log('HTTP Server Running!')
})

app.use('/products', productsRoutes)
app.use('/upload', uploadRoutes)