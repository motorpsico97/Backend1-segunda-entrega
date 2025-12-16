import express from 'express';
import ProductManager from '../productManager.js';

const viewsRouter = express.Router();
const productManager = new ProductManager('./src/products.json');

viewsRouter.get('/', async(req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener los productos para el realTimeProducts:', error);
    }
});


viewsRouter.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al obtener los productos para el realTimeProducts:', error);
    }
});



export default viewsRouter;
