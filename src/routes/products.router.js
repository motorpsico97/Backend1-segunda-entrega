import express from 'express';
import ProductManager from '../productManager.js';
import uploader from '../utils/uploader.js';


const productsRouter = express.Router();
const productManager = new ProductManager('./src/products.json');

productsRouter.post('/', uploader.single('file'), async (req, res) => {
    try {
        // Recibir data de formulario
        const nombre = req.body.nombre;
        const marca = req.body.marca;
        const categoria = req.body.categoria;
        const precio = parseInt(req.body.precio);
        const thumbnail = '/img/' + req.file.filename;

        const updatedProducts = await productManager.addProduct({
            nombre,
            marca,
            precio,
            thumbnail,
            categoria
        });

        // Emitir evento a todos los clientes conectados
        const io = req.app.get('io');
        io.emit('updateProducts', updatedProducts);

        res.redirect('/realTimeProducts');
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send('Error al agregar el producto');
    }
});




export default productsRouter;