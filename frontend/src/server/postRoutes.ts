import { AxiosResponse } from "axios";
import { backendURL } from "./setBackend";
import FormData from "form-data";

export const postFileIpfs = async (data: string) => {
    backendURL
        .post('/ipfs/upload', {
            file: data
        })
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .catch((error) => {
            console.error(`error: ${error}`);
            return false;
        });
};