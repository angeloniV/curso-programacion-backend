import express from 'express';
import handlebars from 'express-handlebars';
import pokedexRouter from './routes/pokedex.router.js';
import __dirname from './utils.js';
import mongoose, { mongo } from 'mongoose';


const app = express();

// Para traer info de post como JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurar motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

// Carpeta publica
app.use(express.static(__dirname + '/public'));

// Configurar rutas
app.use('/pokedex', pokedexRouter);
app.get('/', (req, res) => res.send('Work great!'))

const uri = 'mongodb+srv://administrator:iaailvSEeiDX7jrH@cluster0.ozmlq6c.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(uri, error => {
    if (error) {console.log("Can't initialize DB"); return;}
    console.log("Db connected");

    // Iniciar servidor
    const server = app.listen(8080, () => console.log("Server listening..."));
    server.on('error', e => console.log(e));
});


