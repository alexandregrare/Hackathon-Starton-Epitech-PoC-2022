import React, {useCallback, useEffect, useState} from "react";
import {Button} from "pages/Home/index";
import { postFileIpfs } from "../../../server/postRoutes";
import { getFileIpfs } from "../../../server/getRoutes";
import styled from "styled-components";
import {getSizeStatus} from "utils/getSizeStatus";
import LoadAnimation from "pages/Home/DropPage/loadAnimation";
import pushFile from "client/pushFile";

export interface FileDataType {
  lastModified?: number;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
  data?: string;
}

interface DropPageProps {
  fileData: FileDataType;
  setIsUpload: (bool: boolean) => void;
  setReloadStatus: (bool: boolean) => void;
  setFileData: (data: FileDataType) => void;
}

const DropPage = ({ fileData, setIsUpload, setReloadStatus, setFileData }: DropPageProps): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onloadstart = () => {
      setLoadStatus(true);
    }

    reader.onloadend = () => {
      setLoadStatus(false);
      // @ts-ignore
      const view = new Int8Array(reader.result);
      setFileData({
        lastModified: e.target.files[0]?.lastModified,
        name: e.target.files[0]?.name,
        size: e.target.files[0]?.size,
        type: e.target.files[0]?.type,
        webkitRelativePath: e.target.files[0]?.webkitRelativePath,
        data: view.toString()
      });
    };
  }, [setFileData, setLoadStatus]);

  useEffect(() => {
    if (getSizeStatus({bytesValue: fileData?.size})) {
      setReloadStatus(true);
    }
  }, [setReloadStatus, fileData]);

  const handleUpload = useCallback(() => {
    if (!loadStatus && fileData) {
      setIsDragOver(false);
      if (pushFile({fileData})) {
        setIsUpload(true);
      } else {
        setReloadStatus(true);
      }
    }
  }, [setIsUpload, loadStatus, fileData, setReloadStatus])

  return (
    <>
      <DropArea
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
      >
        <Input onChange={handleChangeInput} type={'file'}/>
        {!isDragOver ?
          <>
            <AddIcon src={'/assets/add_file.svg'}/>
            <PrincipalDescription>Drag &
              drop <ImportantWord>images</ImportantWord>, <ImportantWord>videos</ImportantWord> or
              any <ImportantWord>file</ImportantWord></PrincipalDescription>
            <SecondaryDescription>or <ImportantWordLink>browse file</ImportantWordLink> on your
              computer</SecondaryDescription>
          </> :
          <DragOverContainer>
            <GifContainer>
              <LeftGif src={'/assets/arrow.gif'}/>
              <Icon src={'/assets/file.svg'}/>
              <RightGif src={'/assets/arrow.gif'}/>
            </GifContainer>
            <DropHereText>Drop it right here !</DropHereText>
          </DragOverContainer>}
      </DropArea>
      <FileUploaded style={{opacity: (fileData || loadStatus) ? '1' : '0'}} >
        {loadStatus ?
          <FileMetaContainer>
            <LoadAnimation style={{ marginRight: '12px' }} />
            <FileName>Loading...</FileName>
          </FileMetaContainer> :
          <>
            <FileMetaContainer>
              <FileIcon src={'/assets/document.png'} />
              <FileName>{fileData?.name}</FileName>
            </FileMetaContainer>
            <SizeLimite><ImportantWord>{!getSizeStatus({bytesValue: fileData?.size}) ? 'Size accept ✓' : 'Size NOT accept ✘' }</ImportantWord></SizeLimite>
          </>}
      </FileUploaded>
      <Button onClick={handleUpload} >Upload</Button>
    </>
  );
};

interface DropAreaProps {
  isDragOver: boolean;
}

const DropArea = styled.div<DropAreaProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  border: 3px rgba(155, 0, 59, 0.3) dashed;
  border-radius: 28px;
  padding: ${({isDragOver}) => !isDragOver ? '24px' : 'unset'};
  box-sizing: border-box;
  overflow-y: hidden;
`;

const AddIcon = styled.img`
  width: 105px;
  height: 105px;
  filter: drop-shadow(10px 10px 8px rgba(103, 102, 102, 0.4));
`;

const PrincipalDescription = styled.h1`
  font-size: 30px;
  width: 60%;
  text-align: center;
  margin: 12px 0 0 0;
  color: #3D3D3D;
`;

const ImportantWord = styled.span`
  margin: 0;
  color: #FF844C;
`;

const SecondaryDescription = styled.h1`
  font-size: 15px;
  width: 50%;
  text-align: center;
  margin: 12px 0 0 0;
  color: #3D3D3D;
`;

const ImportantWordLink = styled.span`
  margin: 0;
  color: #FF844C;
  text-decoration: 1px #FF844C solid underline;
  text-underline-offset: 5px;
  cursor: pointer;
`;

const DragOverContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(155, 0, 59, 0.3);
`;

const GifContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const RightGif = styled.img`
  height: 70%;
  transform: rotate(-90deg);
`;

const LeftGif = styled.img`
  height: 70%;
  transform: scaleX(-1) rotate(-90deg);
`;

const DropHereText = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

const Icon = styled.img`
  height: 100%;
  margin: 0 24px;
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  top: 0;
  z-index: 20;
`;

const FileUploaded = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin: 12px 0;
  border-radius: 8px;
`;

const FileMetaContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  box-sizing: border-box;
`;

const FileIcon = styled.img`
  height: 100%;
  margin-right: 5px;
`;

const FileName = styled.p`
  color: #3D3D3D;
  width: 300px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const SizeLimite = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3D3D3D;
`;

export default DropPage;