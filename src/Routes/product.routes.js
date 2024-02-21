import { Router } from "express";
const router=router();

// Simulamos una DB
let product = []

// Listar todos los usuarios
router.get('/', (req, res) => {
    res.send(product);
})

// Crear o dar de alta un usurio
router.post('/', (req, res) => {
    console.log(req.body);
    let product= req.body

    // Asiognamos un ID
    const numRamdom = Math.floor(Math.random() * 100 + 1)
    product.id = numRamdom

    if (!product.titulo || !product.descripcion || !product.precio || !product.imagen || !product.stock || !product.codigo) {
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada!!" })
    }

    product.push(user)
    res.send({ status: "Success", msg: 'Producto creado!!' })
})

// ACTUALIZAR
router.put('/:poductId', (req, res) => {
    // capturo el id
    let productId = parseInt(req.params.productId)

    // capturo info del req.body
    let productUpdate = req.body

    const productPosition = users.findIndex((u => u.id === productId));

    if (productPosition < 0) {
        return response.status(202).send({ status: "info", error: "Producto no encontrado" });
    }

    u[productPosition] = productUpdate;

    res.send({ status: "Success", message: "Producto Actualizado.", data: users[userPosition] }); //Si no se indica retorna status HTTP 200OK.

})


// DELETE
router.delete('/:productId', (req, res) => {
    let productId = parseInt(req.params.productId);

    // tomamos el tamanio del array antes de elimanr el registro
    const productSize = product.length;


    // buscamos el registro por el id
    const productPosition = product.findIndex((u => u.id === productId));
    if (productPosition < 0) {
        return response.status(202).send({ status: "info", error: "Producto no encontrado" });
    }

    // Eliminamos el registro
    product.splice(productPosition, 1);
    if (product.length === productSize) {
        return response.status(500).send({ status: "error", error: "Usuario no se pudo borrar." });
    }


    res.send({ status: "Success", message: "Producto Eliminado." }); //Si no se indica retorna status HTTP 200 OK.

})

















export default router;
