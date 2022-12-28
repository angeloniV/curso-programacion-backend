import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js'

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080...");
});

const io = new Server(httpServer);

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('msg_front', message => console.log(message));
    socket.emit('msg_back', "Conectado al servicio, Bienvenido desde el Back")
})
