import {FileDataType} from "pages/Home/DropPage";
import { postFileIpfs } from "../server/postRoutes";
import { getFileIpfs } from "../server/getRoutes";

interface PushFileProps {
  fileData?: FileDataType;
  password?: string;
}

const pushFile = ({ fileData, password }: PushFileProps): boolean => {
  if (fileData === undefined || password === undefined) {
    return false;
  }
  let str = "test";

  postFileIpfs(str).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
};

export default pushFile;