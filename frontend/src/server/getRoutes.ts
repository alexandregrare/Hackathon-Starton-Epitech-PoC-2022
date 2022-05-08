import { AxiosResponse } from "axios";
import { backendURL } from "./setBackend";

export const getFileIpfs = (data: string) => {
    backendURL
        .get('/ipfs/get', {
            params: {
                request_id: data
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(`error: ${error}`);
            return false;
        });
};