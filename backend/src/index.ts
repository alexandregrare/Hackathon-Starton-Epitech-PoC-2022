import express from 'express';
import auth from './middleware/auth';
import IpfsRouter from './router/ipfsRouter'
const port = 3000;
const app = express();

app.use(express.json({limit: '2mb'}))
app.use("/ipfs/",auth, IpfsRouter)
app.listen(port, () => console.log(`Ready on port ${port}`))