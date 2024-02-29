import fs from 'fs';

class productos{
    constructor(titulo, descripcion, precio, imagen, stock, codigo,id){
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.precio=precio;
        this.imagen=imagen;
        this.stock=stock;
        this.codigo=codigo;
        this.id=id;

    }
}

class ProductManager {
    #product;
    #productDirpath;
    #productFilePath;
    #fileSystem;
producto
    constructor() {
        this.#product = [];
        this.#productDirpath = "./DB";
        this.#productFilePath = this.#productDirpath+"/Productos.json";
        this.#fileSystem = fs;
    }
#preparamosDirectorioBase = async()=>{
   await this.#fileSystem.promises.mkdir(this.#productDirpath,{recursive: true});
   if (!this.#fileSystem.existsSync(this.#productFilePath)){
   await this.#fileSystem.promises.writeFile(this.#productFilePath,"[]"); 
   }}
crearProducto = async (titulo, descripcion, precio, imagen, stock, codigo,id) => {
    const numRandom = Math.floor(Math.random() * 10000 + 1);
    id = numRandom;

     let productNuevo = new productos(titulo, descripcion, precio, imagen, stock, codigo,id)
     console.log("Crear Producto: Producto a registrar:");
     console.log(productNuevo);
try{
    await this.#preparamosDirectorioBase();

    await this.consultarProduct();
    if (this.#product.find(u=>u.codigo===codigo)){
        console.warn("Producto existente, revise los datos")
    } else{
        this.#product.push(productNuevo);
        console.log("lista de productos agregada");
        console.log(this.#product);
        await this.#fileSystem.promises.writeFile(this.#productFilePath,JSON.stringify(this.#product));
    } }catch (error){
        console.error(`Error creando producto nuevo: ${JSON.stringify(productNuevo)}, detalle del error: ${error}`);
        throw Error(`Error creando producto nuevo: ${JSON.stringify(productNuevo)}, detalle del error: ${error}`);     
    }

}
consultarProduct= async()=>{
    try{
    await this.#preparamosDirectorioBase();
    let productosFile= await this.#fileSystem.promises.readFile(this.#productFilePath,"utf-8");
    console.log(productosFile);

    this.#product= JSON.parse(productosFile);
    console.log("usuarios encontrado:");
    console.log(this.#product);
    return this.#product;
} catch (error) {
    console.error(`Error consultando los productos por archivo, valide el archivo: ${this.#productDirpath}, 
    detalle del error: ${error}`);
throw Error(`Error consultando los productos por archivo, valide el archivo: ${this.#productDirpath},
 detalle del error: ${error}`);
}

}

actualizarProducto= async(productId, updatedProductData) => {
    try {
        await this.#preparamosDirectorioBase();
        await this.consultarProduct();

        const productIndex = this.#product.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            throw new Error('El producto no existe.');
        }

        // No se debe actualizar el ID
        updatedProductData.id = productId;

        // Actualizar los campos del producto
        this.#product[productIndex] = { ...this.#product[productIndex], ...updatedProductData };

        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#product));
    } catch (error) {
        throw new Error(`Error al actualizar el producto: ${error}`);
    }
}

eliminarProducto= async (productId) =>{
    try {
        await this.#preparamosDirectorioBase();
        await this.consultarProduct();

        const updatedProducts = this.#product.filter(product => product.id !== productId);

        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(updatedProducts));
    } catch (error) {
        throw new Error(`Error al eliminar el producto: ${error}`);
    }
}

}


export default ProductManager;








