import express from 'express';
import userModel from '../models/user.model';
import mongoose from 'mongoose';

const app = express();
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.log(error);
        res.send({ result: 'error', error });
    }
});

app.post('/', async (req, res) => {
    try {
        const result = await userModel.create(req.body);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
        res.send({ result: 'error', error });
    }
});

app.put('/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        const userToReplace = req.body;
        const result = await userModel.updateOne({ _id, uid }, userToReplace);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
        res.send({ result: 'error', error });
    }
});

app.delete('/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        const users = await userModel.deleteOne({ _id, uid });
        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.log(error);
        res.send({ result: 'error', error });
    }
});



mongoose.connect('mongodb+srv://administrator:iaailvSEeiDX7jrH @cluster0.ozmlq6c.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'baseCrud'
}, (error) => {
    if (!error) {
        console.log("Db connect");
        app.listen(8080, () => console.log("running..."));
    } else {
        console.log("Cant connect to Db");
    }
});

