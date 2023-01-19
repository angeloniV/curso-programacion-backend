import { Router } from 'express';
import modelPokemon from '../models/pokemon.models.js';

const router = Router();

// Listar pokemones
router.get('/', async (req,res) => {
    const pokemons = await modelPokemon.find().lean().exec();
    res.render('list', { pokemons })
})

// Ruta para pagina para crear pokemons
router.get('/create', (req, res) => {
    res.render('create', {});
});

// Obtener un pokemon
router.get('/:name', async (req,res) => {
    const name = req.params.name;
    const pokemon = await modelPokemon.findOne({name: name}).lean().exec();
    res.render('one', { pokemon });
})

// Crear un pokemon
router.post('/', async (req,res) => {
    const pokemonNew = req.body;
    const pokemonGenerado = new modelPokemon(pokemonNew);
    await pokemonGenerado.save();
    res.redirect('/pokedex/' + pokemonGenerado.name);
})

router.put('/', (req,res) => {
    res.send('Actualizando pokemon')
})

// Borrar un pokemon
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    res.send('Eliminar pokemon ' + id)
})

export default router;
