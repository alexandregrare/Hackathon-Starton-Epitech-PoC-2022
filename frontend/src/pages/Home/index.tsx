import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SuccessPage from "pages/Home/SuccessPage";
import DropPage, {FileDataType} from "pages/Home/DropPage";
import SharedPage from "pages/Home/SharedPage";

const Home = (): JSX.Element => {
  const [fileData, setFileData] = useState<FileDataType>(undefined);
  const [sharedPageStatus, setSharedPageStatus] = useState(false);
  const [reloadStatus, setReloadStatus] = useState(undefined);
  const [isUpload, setIsUpload] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [id, setId] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (reloadStatus) {
      setIsUpload(false);
      setSharedPageStatus(false);
      setFileData(undefined);
      setReloadStatus(false);
    }
  }, [reloadStatus]);

  useEffect(() => {
    if (id && passwordValue) {
      setUrl(`http://localhost:3000/download/?request_id=${id}&pw=${passwordValue}`)
    }
  }, [passwordValue, id])

  return (
    <Container>
      <Background src={'/assets/back4.svg'}/>
      <BoxContainer>
        {sharedPageStatus ?
          <SharedPage
            setReloadStatus={setReloadStatus}
            link={url} /> :
          !isUpload ?
            <DropPage setReloadStatus={setReloadStatus} fileData={fileData} setIsUpload={setIsUpload} setFileData={setFileData} /> :
            <SuccessPage
              setId={setId}
              fileData={fileData}
              passwordValue={passwordValue}
              setReloadStatus={setReloadStatus}
              setPasswordValue={setPasswordValue}
              setSharedPageStatus={setSharedPageStatus}
            />}
      </BoxContainer>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  user-select: none;

  @media screen and (max-width: 850px) {
    padding: 24px;
    box-sizing: border-box;
  }
`;

export const Background = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 600px;
  height: 450px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #E5E8E8;
  border-radius: 32px;
  z-index: 1;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  overflow: hidden;
`;

interface ButtonProps {
  isNotClickable?: boolean;
}

export const Button = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  background: ${({ isNotClickable }) => isNotClickable ? '#cecccc' : '#FF844C'};
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: ${({ isNotClickable }) => isNotClickable ? 'not-allowed' : 'pointer'};
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  font-weight: bold;

  :hover {
    background: ${({ isNotClickable }) => isNotClickable ? '' : 'rgba(255, 132, 76, 0.8)'};
  }
`;

export default Home;