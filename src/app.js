import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import productsRouter from './routes/products.router.js';

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// WebSocket 
const io = new Server(server);


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