import express from 'express';
import IpfsController from '../controller/IpfsController';
const router = express.Router();

const ipfsController = new IpfsController();

router.post('/upload', (req: express.Request, res: express.Response) => ipfsController.uploadData(req, res));
router.get('/get', (req: express.Request, res: express.Response) => ipfsController.getData(req, res));

export default router;