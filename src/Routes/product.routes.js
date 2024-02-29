import { Router } from 'express';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import ProductManager from '../Service/ProductManager.js';
import { error } from 'node:console';

const router = Router();

// Simulamos una DB
const filePath= './Base de datos/Productos.json'
let productManager = new ProductManager();


router.get("/",async(req,res)=> {
console.log("consultando productos GET.");
try{
let products=await productManager.consultarProduct()
const limit= req.query.limit;

if(limit){
    products= products.slice(0,parseInt(limit));
}
res.send(products);
}
catch(error){
console.log("Error al consultar un producto:"+ error);
res.status(500,{error:"Error consultando productos", mensagge :error})
}

}) 


// Crear o dar de alta un producto
router.post('/', async(req, res) => {
    try{
    console.log("llamadoa crear un producto:");
    const newProduct = req.body;

    // Asignamos un ID
    const numRandom = Math.floor(Math.random() * 100 + 1);
    newProduct.id = numRandom;

    await productManager.crearProducto(newProduct.titulo, newProduct.descripcion, newProduct.precio, newProduct.imagen,newProduct.stock, newProduct.codigo,newProduct.id);

    res.status(201).send({ mensaje: "Producto creado con exito " + newProduct.id });  
} catch (error){
    console.log("Error guardando producto. Error: " + error); 
    res.status(500).send({error: "Error guardando producto", mensagge: error});

}
});


router.get('/', (req, res) => {
    res.json(productManager);
})


// ACTUALIZAR
router.put('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const updatedProductData = req.body;

        await productManager.actualizarProducto(productId, updatedProductData);

        res.status(200).json({ status: 'Success', message: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ status: 'Error', message: 'No se pudo actualizar el producto.' });
    }
});

// ELIMINAR
router.delete('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);

        await productManager.eliminarProducto(productId);

        res.status(200).json({ status: 'Success', message: 'Producto eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ status: 'Error', message: 'No se pudo eliminar el producto.' });
    }
});




export default router;
