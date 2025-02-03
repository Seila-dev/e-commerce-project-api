import { app } from "./app"
import productsRoutes from "./routes/products-routes"
import uploadRoutes from "./routes/upload-routes"

const port = 3000

app.listen(port, () => {
    console.log('HTTP Server Running!')
})

app.use('/products', productsRoutes)
app.use('/upload', uploadRoutes)