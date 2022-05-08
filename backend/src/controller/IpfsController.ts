import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();

const STARTON_API_KEY = process.env.STARTON_API_KEY;
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
    file: string
}

const createUrl = (ipfsData: any) => {

    return ipfsData.requestid;
}
export default class IpfsController {

    async uploadData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        try {
            let data = new FormData();
            let file: any = req.body.file;

            if (file == null) {
                return res.status(400).json({ message: 'No file was uploaded.' });
            }
            const fileSend : File = {name : "", file}
            data.append("file", fileSend.file, "name");
            data.append("isSync", "true");

            try {
                const ipfsImg = await starton.post("/pinning/content/file", data, {
                    maxBodyLength: "Infinity",
                    headers: { "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`},
                });
                return res.status(200).send(createUrl(ipfsImg.data));
            } catch (error) {
                console.error(error);
                return res.status(500).send('Error while sending data to starton server.');
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send('Error while sending data to starton server');
        }
    }

    async getData(req: express.Request, res: express.Response) : Promise<express.Response | null>
    {
        const tmpId = req.query.request_id;

        res.setTimeout(300000);
        if (tmpId == undefined) {
            return res.status(400).json({ message: 'No request id was provided.' });
        }

        const id : string = tmpId.toString();
        const ipfsImg = await starton.get("/pinning/content/".concat(id), {
            maxBodyLength: "Infinity",
            headers: { "Content-Type": `multipart/form-data`}
        })
        .catch((e: any) => {
            return res.status(500).send('Error while sending data to starton server');
        });

        for (let i : number = 0; i < 4; i++) {
            try {
                const ipfsFile = await axios.get("https://ipfs.io/ipfs/".concat(ipfsImg.data.pinStatus.pin.cid));

                return res.status(200).send(ipfsFile.data);
            } catch (error) {}
        }

        return res.status(500).send('Error while trying to get data from ipfs');

    }
}
