import {Router} from 'express'
import messageModel from '../dao/models/message.model.js';

const router = Router()

// Ruta para pagina para crear productos
router.get('/iniciar', (req, res) => {
    res.render('chat', {});
});

router.post('/api/message', async (req, res) => {
    const messageNuevo = req.body;
    const messageGenerado = new messageModel(messageNuevo);
    await messageGenerado.save()
});

export default router;
