import express from 'express';
import auth from './middleware/auth';
import IpfsRouter from './router/ipfsRouter'
import bodyParser from 'body-parser';
import multer from 'multer';

const port = 3000;
const app = express();
let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array('file'));
app.use(express.static('public'));

app.use(express.json({limit: '2mb'}))
app.use("/ipfs/", IpfsRouter)
app.listen(port, () => console.log(`Ready on port ${port}`))