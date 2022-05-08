import { AxiosResponse } from "axios";
import { backendURL } from "./setBackend";
import FormData from "form-data";

export const postFileIpfs = (data: FileList) => {
    const formdata = new FormData();
    formdata.append("file", data[0], data[0].name);
    backendURL
        .post('/ipfs/upload', formdata)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(`error: ${error}`);
            return false;
        });
};