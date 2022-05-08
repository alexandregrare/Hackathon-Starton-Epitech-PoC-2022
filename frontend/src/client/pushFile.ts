import {FileDataType} from "pages/Home/DropPage";
import crypto from 'crypto-js'

interface PushFileProps {
  fileData?: FileDataType;
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

export const pushFile = ({ fileData, password }: PushFileProps): boolean => {
  console.log("here")
  if (fileData === undefined || password === undefined) {
    return false;
  }
  let data = encryptFile({fileData, password})
  console.log(getFile({data , password}));
  return true;
};

interface GetFileProps {
  data: string;
  password: string;
}

export const getFile = ({ data, password }: GetFileProps): FileDataType => {
  let decryptData = decryptFile({ data, password })
  const file: FileDataType = JSON.parse(decryptData);

  return file;
};