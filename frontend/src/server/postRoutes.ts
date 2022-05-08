import { AxiosResponse } from "axios";
import { backendURL } from "./setBackend";
import FormData from "form-data";

export const postFileIpfs = async (data: string) : Promise<string> => backendURL
        .post('/ipfs/upload', {
            file: data
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(`error: ${error}`);
            return false;
        });