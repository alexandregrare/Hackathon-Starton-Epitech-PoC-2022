import crypto from 'crypto-js'
import {FileDataType} from "pages/Home/DropPage";
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

const pushFile = ({ fileData, password }: PushFileProps): boolean => {
  if (fileData === undefined || password === undefined) {
    return false;
  }
  let data = encryptFile({fileData, password})
  console.log(getFile({data , password}));
  return true;
};

const getFile = ({ data, password }: {data : string, password : string}): FileDataType => {
  let decryptData = decryptFile({ data, password })
  const file : FileDataType = JSON.parse(decryptData);

  return file;
};

export default pushFile;