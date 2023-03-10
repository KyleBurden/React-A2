//Project completed by Kyle burden
//20165611

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ filename: (req, file) => {file.originalname;}, dest: "./src/build/images/"});

const uploadFiles = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('movie-data');
 
        await db.collection('movies').insertOne( {
            name:req.body.name, 
            date:req.body.date, 
            actors:req.body.actors.split(", "), 
            poster:"/images/" + req.file.filename, 
            rating:req.body.rating
        })
        
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json({message: "Success!!!", movies: movieInfo});
        client.close();
    } catch (error) {
        res.status(500).json( { message: "Error connecting to the database", error});
    }
}

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/movies', async (res) => {

    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('movie-data');

        const movieInfo = await db.collection('movies').find({}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
});

app.post('/api/addMovie', upload.single("poster"), uploadFiles);
app.post('/api/removeMovie', async (req, res) => {

    try {

        console.log(req.body.name);

        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('movie-data');

        let returnVal = await db.collection('movies').deleteOne( {name:req.body.name})
        console.log(returnVal);
        //const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
        if( returnVal.deletedCount == 1) {
            res.status(200).json({message: `Movie ${req.body.name} deleted`});
        }
        else {
            res.status(200).json({message: "Unable to delete the movie"});
        }
        client.close();
    }
    catch (error) {
        res.status(500).json( { message: "Error connecting to database", error});
    }
});


app.get('/api/oneMovie/:name', async (req, res) => {

    console.log(req.params.name);

    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('movie-data');

        const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to the database", error});
    }
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))});
app.listen(8000, () => console.log("It is Listening on port 8000"));