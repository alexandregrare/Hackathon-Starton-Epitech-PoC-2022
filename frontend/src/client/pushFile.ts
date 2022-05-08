import {FileDataType} from "pages/Home/DropPage";

interface PushFileProps {
  fileData?: FileDataType;
}

const pushFile = ({ fileData }: PushFileProps): boolean => {
  if (fileData === undefined) {
    return false;
  }
  return true;
};

export default pushFile;