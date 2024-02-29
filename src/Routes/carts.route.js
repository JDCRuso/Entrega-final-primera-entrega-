import { Router } from 'express';
import CartsManager from '../Service/CartsManager.js';

const router = Router();
const cartsManager = new CartsManager();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.crearCarrito();
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartsManager.consultarCarts(cartId);
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error al consultar el carrito:', error);
        res.status(500).json({ error: 'Error al consultar el carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);

        await cartsManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

export default router;