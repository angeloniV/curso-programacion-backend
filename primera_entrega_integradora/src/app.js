import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import { Server } from 'socket.io';

const app = express();

// Para traer info como json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Para poder sobreescribir metodo de forms, tanto en actualizar producto como en eliminar. Ver botones submit en ambos casos.
app.use(methodOverride('_method'))

// Configurar motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static(__dirname + '/public'));

// Configurar rutas
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/chat', chatRouter)

const uri ="mongodb+srv://administrator:iaailvSEeiDX7jrH@cluster0.ozmlq6c.mongodb.net/?retryWrites=true&w=majority";

const env = async() =>
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
        dbName: 'ecommerce'
    }, error => {
        if (error) {
            console.log("Can't initialize DB"); return;
        }else{
            console.log("Db connected");
            // Iniciar servidor
            const httpServer = app.listen(8080, () => console.log("Server listening..."));
            
            // Manejo chat
            const io = new Server(httpServer);
            const messages = [];
            io.on('connection', socket => {
                console.log('New client connected');
                socket.on('message', data => {
                    messages.push(data)
                    io.emit('logs', messages)
                })
            });

            app.use((req, res, next) => {
                req.io = io
                next()
            })
        }

    });


    env();
