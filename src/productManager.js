import fs from 'fs/promises';
// UUID
import crypto, { generateKey } from 'crypto';

class ProductManager {

    constructor (pathFile) {
        this.pathFile = pathFile;
    }

    generateNewId() {
        return crypto.randomUUID();
    }

    async addProduct(newProduct){
        try {
            // recuperar los productos de mi archivo JSON
            const fileData = await fs.readFile(this.pathFile, 'utf-8');
            const products = JSON.parse(fileData);

            const newId = this.generateNewId();
            const product = {id: newId, ...newProduct};
            products.push(product);

            //guardamos el producto en el archivo JSNON
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), 'utf-8');
            return products;
        } catch (error) {
            throw new Error(`No se pudo agregar el producto: ${error.message}`);
        }
    }

    async getProducts(){
        try {
            // recuperar los productos de mi archivo JSON
            const fileData = await fs.readFile(this.pathFile, 'utf-8');
            const products = JSON.parse(fileData);
            return products;
        } catch (error) {
            throw new Error(`No se pudieron obtener los productos: ${error.message}`);
        }   
    }

    // Editar productos ya existentes
    async setProductById(pid, updates){
        try {
         // recuperar los productos de mi archivo JSON
            const products = await this.getProducts();

            const indexProduct = products.findIndex((product) => product.id === pid);
            if(indexProduct === -1) throw new Error(`El producto con el id: ${pid} no existe`);
            products[indexProduct] = { ...products[indexProduct], ...updates };

            //guardamos el producto en el archivo JSNON
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), 'utf-8');
            return products;    

        } catch (error) {
          throw new Error(`No se pudo actualizar el producto: ${error.message}`);  
        }
    }

    async deleteProductById(pid){
        try {
            const products = await this.getProducts();

            const filterProducts = products.filter((product) => product.id !== pid);

            //guardamos el producto en el archivo JSNON
            await fs.writeFile(this.pathFile, JSON.stringify(filterProducts, null, 2), 'utf-8');
            return filterProducts;
     
        } catch (error) {
            throw new Error(`No se pudo eliminar el producto: ${error.message}`);
        }

    }
};
export default ProductManager;