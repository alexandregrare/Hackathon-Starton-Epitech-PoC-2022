import { AxiosResponse } from "axios";
import { backendURL } from "./setBackend";

export const getFileIpfs = async (data: string): Promise<string> =>
    backendURL
        .get('/ipfs/get', {
            params: {
                request_id: data
            }
        })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error(`error: ${error}`);
            return "";
        });
