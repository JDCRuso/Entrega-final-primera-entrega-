import { Router } from "express";
const router=router();


cartsRouter.post('/', (req, res) => {
    const newCart = {
        id: generateUniqueId(), // Función para generar un ID único para el carrito
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});


cartsRouter.get('/:cid', (req, res) => {
    const cart = carts.find(cart => cart.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});


cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

   
    const cartIndex = carts.findIndex(cart => cart.id === cid);
    const productIndex = products.findIndex(product => product.id === pid);

    if (cartIndex === -1 || productIndex === -1) {
        return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }

    
    const existingProductIndex = carts[cartIndex].products.findIndex(item => item.id === pid);

    if (existingProductIndex !== -1) {
       
        carts[cartIndex].products[existingProductIndex].quantity += quantity;
    } else {
        
        carts[cartIndex].products.push({
            id: pid,
            quantity: quantity
        });
    }

    res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
});


function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}















export default router;