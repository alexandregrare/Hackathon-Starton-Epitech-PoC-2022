import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();

const { STARTON_API_KEY } = process.env;
const starton: any = axios.create(
  {
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": `${STARTON_API_KEY}`,
    },
  }
)

interface File {
    name: string,
    file: any
}

export default class IpfsController {
    async uploadData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        let data = new FormData();
        let files: any = req.files;

        console.log(files[0]);
        const params : File = {
            name: (files[0].originalname != undefined) ? files[0].originalname : "NoName",
            file: files[0].buffer
        };

        data.append("file", params.file, params.name);
        data.append("isSync", "true");

        const ipfsImg = await starton.post("/pinning/content/file", data, {
            maxBodyLength: "Infinity",
            headers: { "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}` },
        }).catch((error : any) => { console.log(error) });

        return res.status(200).send(ipfsImg.data);
    }

    async getData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        const id : string = req.body.request_id;

        const ipfsImg = await starton.get("/pinning/content/".concat(id), {
            maxBodyLength: "Infinity",
            headers: { "Content-Type": `multipart/form-data` },
        }).catch((error : any) => { console.log(error) });

        const ipfsFile = await axios.get("https://ipfs.io/ipfs/".concat(ipfsImg.data.pinStatus.pin.cid));

        return res.status(200).send(ipfsFile.data);
    }
}
