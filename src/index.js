import Express  from "express";
import productRoutes from './Routes/product.routes.js'
import cartsRoutes from './Routes/carts.route.js'

const app= expres();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/product',productRoutes);
app.use('/api/carts',cartsRoutes);

const PORT= 8080;






app.listen(PORT, ()=>
console.log(`server run on port ${PORT}`))