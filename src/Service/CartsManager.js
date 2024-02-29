import fs from 'fs';

class Cart {
    constructor(id, products = []) {
        this.id = id;
        this.products = products;
    }
}

class CartsManager {
    #carts;
    #cartsDirPath;
    #cartsFilePath;
    #fileSystem;
    #productsFilePath;

    constructor(productsFilePath) {
        this.#carts = [];
        this.#cartsDirPath = "./DB";
        this.#cartsFilePath = this.#cartsDirPath + "/Carts.json";
        this.#fileSystem = fs;
        this.#productsFilePath = "./DB/Productos.json"; ""
    }

    #preparamosDirectorioBase= async()=> {
        await this.#fileSystem.promises.mkdir(this.#cartsDirPath, { recursive: true });
        if (!this.#fileSystem.existsSync(this.#cartsFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#cartsFilePath, "[]");
        }
    }

    crearCarrito=async()=> {
        try {
            await this.#preparamosDirectorioBase();
            await this.consultarCarts();

            const newCartId = Math.floor(Math.random() * 10000 + 1);

            const newCart = new Cart(newCartId);
            this.#carts.push(newCart);

            await this.#fileSystem.promises.writeFile(this.#cartsFilePath, JSON.stringify(this.#carts));

            return newCart;
        } catch (error) {
            throw new Error(`Error creando el carrito: ${error}`);
        }
    }

    
     agregarProductoAlCarrito= async(cartId, productId, quantity = 1) => {
        try {
            await this.#preparamosDirectorioBase();
            await this.consultarCarts();

            // Verificar si el producto existe en el archivo de productos
            const productosFile = await this.#fileSystem.promises.readFile(this.#productsFilePath, "utf-8");
            const products = JSON.parse(productosFile);
            const existingProduct = products.find(product => product.id === productId);

            if (!existingProduct) {
                throw new Error('El producto que intenta agregar al carrito no existe.');
            }

            const cartIndex = this.#carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                throw new Error('El carrito no existe.');
            }

            const existingProductIndex = this.#carts[cartIndex].products.findIndex(product => product.id === productId);
            if (existingProductIndex !== -1) {
                // Si el producto ya existe, incrementa la cantidad
                this.#carts[cartIndex].products[existingProductIndex].quantity += quantity;
            } else {
                // Si el producto no existe, agrégalo al carrito
                this.#carts[cartIndex].products.push({ id: productId, quantity });
            }

            await this.#fileSystem.promises.writeFile(this.#cartsFilePath, JSON.stringify(this.#carts));
        } catch (error) {
            throw new Error(`Error agregando producto al carrito: ${error}`);
        }
    }
    async consultarCarts() {
        try {
            await this.#preparamosDirectorioBase();

            const cartsFile = await this.#fileSystem.promises.readFile(this.#cartsFilePath, "utf-8");
            this.#carts = JSON.parse(cartsFile);

            return this.#carts;
        } catch (error) {
            throw new Error(`Error consultando los carritos: ${error}`);
        }
    }

}

export default CartsManager;