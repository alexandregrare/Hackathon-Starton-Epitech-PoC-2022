import {FileDataType} from "pages/Home/DropPage";

interface PushFileProps {
  fileData?: FileDataType;
  password?: string;
}

const pushFile = ({ fileData, password }: PushFileProps): boolean => {
  if (fileData === undefined || password === undefined) {
    return false;
  }
  return true;
};

export default pushFile;