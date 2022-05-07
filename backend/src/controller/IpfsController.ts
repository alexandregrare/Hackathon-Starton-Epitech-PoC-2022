import express from 'express';

export default class IpfsController {
    async uploadData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        return res.status(200).send("Upload data from ipfs.");
    }
    async getData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        return res.status(200).send("get data from ipfs.");
    }
}
