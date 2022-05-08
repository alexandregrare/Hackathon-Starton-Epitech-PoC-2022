import {Background, BoxContainer, Container} from "pages/Home";
import {FileDataType, FileMetaContainer, FileName} from "pages/Home/DropPage";
import styled from "styled-components";
import React, {useCallback, useState} from "react";
import SuccessAnimation from "pages/Home/SharedPage/SuccessAnimation";
import {SuccessButton} from "pages/Home/SharedPage";
import {useNavigate} from "react-router-dom";

const Download = (): JSX.Element => {
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [fileData, setFileData] = useState<FileDataType>(undefined);
  const navigate = useNavigate();

  const handleClickDownload = useCallback(() => {
    if (fileData) {
      setDownloadStatus(true);
    }
  }, [fileData]);

  const handleClickUpload = useCallback(() => {
    navigate('/')
  }, []);

  return (
    <Container>
      <Background src={'/assets/back5.svg'}/>
      <BoxContainer>
        <SuccessImage src={'/assets/success.svg'} />
        <FileContainer>
          <FileMetaContainer>
            <FileIcon src={'/assets/document.png'} />
            <FileName>{fileData?.name ? fileData.name : 'invalid link...'}</FileName>
          </FileMetaContainer>
            <Size>{fileData?.size ? `${fileData.size} octets` : ''}</Size>
          <FileIcon onClick={handleClickDownload} style={{ height: '30px' }} src={'/assets/download.svg'} />
        </FileContainer>
        {!downloadStatus ?
          <Button isNotClickable={fileData?.name ? false : true} onClick={handleClickDownload} >Download !</Button> :
          <SuccessButton onClick={handleClickUpload}>
            <SuccessAnimation style={{ width: '20px', height: '20px', marginRight: '12px' }}/>
            Why not upload your own files ?
          </SuccessButton>}
      </BoxContainer>
    </Container>
  )
};

const SuccessImage = styled.img`
  height: 200px;
`;

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px solid #E5E8E8;
  box-shadow: rgba(0, 0, 0, 0.05) 0 1px 2px 0;
`;

const FileIcon = styled.img`
  height: 100%;
  margin-right: 5px;
  cursor: pointer;
  filter: drop-shadow(3px 3px 3px rgba(218, 215, 215, 0.4));
`;

const Size = styled.p`
  color: #a2a1a1;
  min-width: 150px;
  margin: 0 12px 0 0;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
`;

interface ButtonProps {
  isNotClickable?: boolean;
}

const Button = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  background: ${({ isNotClickable }) => isNotClickable ? '#cecccc' : '#FF8A80'};
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: ${({ isNotClickable }) => isNotClickable ? 'not-allowed' : 'pointer'};
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  font-weight: bold;

  :hover {
    background: ${({ isNotClickable }) => isNotClickable ? '' : 'rgba(255, 138, 128, 0.8)'};
  }
`;

export default Download;