import {FileDataType, FileMetaContainer, FileName} from "pages/Home/DropPage";
import SuccessAnimation from "pages/Home/SharedPage/SuccessAnimation";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Background, BoxContainer, Container} from "pages/Home";
import {SuccessButton} from "pages/Home/SharedPage";
import {useNavigate} from "react-router-dom";
import {Input} from "pages/Home/SuccessPage";
import styled from "styled-components";
import {getFile} from "client/pushFile";

const Download = (): JSX.Element => {
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [fileData, setFileData] = useState<FileDataType>(undefined);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const _id = url.searchParams.get('request_id');
    setId(_id ? _id : '');
    const _pw = url.searchParams.get('pw');
    setPassword(_pw ? _pw : '');
  }, []);

  useEffect(() => {
    if (password.length === 0 && passwordRef) {
      passwordRef.current.focus();
    } else if (passwordRef) {
      passwordRef.current.blur();
    }
  }, [passwordRef, password]);

  const handleClickDownload = useCallback(() => {
    if (fileData) {
      const b = fileData.data.split(',').map(Number);
      const a = Uint8Array.from(b)

      const blob = new Blob([a], {type: fileData.type});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileData.name;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, [fileData]);

  const handleValidatePassword = useCallback(() => {
    if (passwordInputValue) {
      if (!password) {
        setPassword(passwordInputValue);
      }
      setPasswordInputValue('');
    }
    setPasswordInputValue('');
  }, [passwordInputValue]);

  const handleClickUpload = useCallback(() => {
    navigate('/')
  }, []);

  const handleChangeValue = useCallback((e) => {
    setPasswordInputValue(e.target.value);
  }, [setPasswordInputValue]);

  useEffect(() => {
    if (id && password) {
      const file = getFile({requestId: id, password})
      file.then(value => {
        setFileData(value);
      }).catch((error) => {
        console.error(error);
      })
    }
  }, [id, password]);

  return (
    <Container>
      <Background src={'/assets/back5.svg'}/>
      <BoxContainer style={{height: '500px'}}>
        <SuccessImage src={'/assets/success.svg'}/>
        <PasswordContainer>
          <Input
            ref={passwordRef}
            type={'password'}
            value={passwordInputValue}
            onChange={handleChangeValue}
            isDisplayed={password.length === 0}
            placeholder={'This file is protected by a password...'}
          />
          <ValidatePasswordButton style={{opacity: password.length === 0 ? '1' : '0'}}
                                  onClick={handleValidatePassword}>???</ValidatePasswordButton>
        </PasswordContainer>
        <FileContainer>
          <FileMetaContainer>
            <FileIcon src={'/assets/document.png'}/>
            <FileName>{fileData?.name ? fileData.name : 'invalid link...'}</FileName>
          </FileMetaContainer>
          <Size>{fileData?.size ? `${fileData.size} octets` : ''}</Size>
          <FileIcon onClick={handleClickDownload} style={{height: '30px'}} src={'/assets/download.svg'}/>
        </FileContainer>
        {!downloadStatus ?
          <Button isNotClickable={!fileData?.name} onClick={handleClickDownload}>Download !</Button> :
          <SuccessButton onClick={handleClickUpload}>
            <SuccessAnimation style={{width: '20px', height: '20px', marginRight: '12px'}}/>
            Why not upload your own files ?
          </SuccessButton>}
      </BoxContainer>
    </Container>
  )
};

const PasswordContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ValidatePasswordButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  background: #FF8A80;
  border-radius: 12px;
  margin-left: 12px;
  cursor: pointer;

  :hover {
    background: rgba(255, 138, 128, 0.6);
  }
`;

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
  background: ${({isNotClickable}) => isNotClickable ? '#cecccc' : '#FF8A80'};
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: ${({isNotClickable}) => isNotClickable ? 'not-allowed' : 'pointer'};
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  font-weight: bold;

  :hover {
    background: ${({isNotClickable}) => isNotClickable ? '' : 'rgba(255, 138, 128, 0.8)'};
  }
`;

export default Download;