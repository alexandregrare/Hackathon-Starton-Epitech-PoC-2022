import crypto from 'crypto-js'
import {FileDataType} from "pages/Home/DropPage";
import { postFileIpfs } from "../server/postRoutes";
import { getFileIpfs } from "../server/getRoutes";

interface PushFileProps {
  fileData?: FileDataType;
  password?: string;
}

interface GetFileProps {
  requestId: string;
  password?: string;
}

const encryptFile = ({ fileData, password }: PushFileProps): string => {
  const buffer = JSON.stringify(fileData);
  const ciphertext = crypto.AES.encrypt(buffer, password).toString();

  return ciphertext;
}

const decryptFile = ({ data, password }: {data: string, password : string} ): string => {
  const bytes  = crypto.AES.decrypt(data, password);
  const originalText = bytes.toString(crypto.enc.Utf8);

  return originalText;
}

const pushFile = async ({ fileData, password }: PushFileProps): Promise<string | null> => {
  if (fileData === undefined || password === undefined) {
    return null;
  }
  const fileEncrype = encryptFile({fileData, password})
  const id = await postFileIpfs(fileEncrype);
  return id;
};

const getFile = async ({requestId, password}: GetFileProps): Promise<FileDataType> => {
  const data = await getFileIpfs(requestId)
  let decryptData = decryptFile({ data, password })
  const file : FileDataType = JSON.parse(decryptData);
  return file;
};

export default pushFile;