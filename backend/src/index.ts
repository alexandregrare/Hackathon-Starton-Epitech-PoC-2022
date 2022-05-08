import express from 'express';
import auth from './middleware/auth';
import dotenv from 'dotenv';
import IpfsRouter from './router/ipfsRouter'
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();
let upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array('file'));
app.use(express.static('public'));

app.use(express.json({limit: '2mb'}));
app.use("/ipfs/", IpfsRouter);
app.listen(PORT, () => console.log(`Ready on port ${PORT}`));