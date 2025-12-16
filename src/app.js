import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import productsRouter from './routes/products.router.js';
import ProductManager from './productManager.js';

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// WebSocket 
const io = new Server(server);
const productManager = new ProductManager('./src/products.json');

// Hacer io accesible en los routers
app.set('io', io);

// Socket.IO events
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('deleteProduct', async (productId) => {
        try {
            const updatedProducts = await productManager.deleteProductById(productId);
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });

    socket.on('updateProduct', async (data) => {
        try {
            const updatedProducts = await productManager.setProductById(data.id, data.updates);
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

//Handlebars configuration
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Endpoints
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

server.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080');
});