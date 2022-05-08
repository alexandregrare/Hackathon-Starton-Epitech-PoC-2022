import SuccessAnimation from "pages/Home/SharedPage/SuccessAnimation";
import React, {useCallback, useState} from "react";
import {Button} from "pages/Home/index";
import styled from "styled-components";

interface SharedPageProps {
  setReloadStatus: (bool: boolean) => void;
  link: string;
}

const SharedPage = ({ setReloadStatus, link }: SharedPageProps): JSX.Element => {
  const [hasLinkCopied, setHasLinkCopied] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleClickCopy = useCallback(() => {
    setHasLinkCopied(true);
    setIsSelected((old) => !old);
    navigator.clipboard.writeText(link);
  }, [link]);

  const handleClickAnother = useCallback(() => {
    setReloadStatus(true);
  }, [setReloadStatus]);

  return (
    <Container>
      <SuccessAnimation style={{ width: '54px', height: '54px' }} />
      <SuccessMessage>File successfully <ImportantWord>uploaded</ImportantWord> !</SuccessMessage>
      <TextContainer>
        <SubTitle>Copy your download link, and keep control of your data.</SubTitle>
        <Description>Congratulations, your document is <ImportantWord>encrypted</ImportantWord> from <ImportantWord>end to end</ImportantWord>. It is now stored on <ImportantWord>IPFS</ImportantWord>.</Description>
      </TextContainer>
      <LinkArea isSelected={isSelected} onClick={handleClickCopy} ><LinkDisplay>{link}</LinkDisplay></LinkArea>
      {!hasLinkCopied ?
        <Button onClick={handleClickCopy} >Copy the link</Button> :
        <Button
          onClick={handleClickAnother}
          style={{ background: '#bde0a2', color: "black" }}
        >
          <SuccessAnimation style={{ width: '20px', height: '20px', marginRight: '12px' }}/>Another one?
        </Button>}
    </Container>
  )
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SuccessMessage = styled.h1`
  margin: 0;
  color: #3D3D3D;
`;

const ImportantWord = styled.span`
  margin: 0;
  color: #FF844C;
`;

const TextContainer = styled.div`
  display: block;
`;

const SubTitle = styled.p`
  margin: 0;
  color: #3D3D3D;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const Description = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #3D3D3D;
  width: 100%;
`;

interface LinkAreaProps {
  isSelected: boolean;
}

const LinkArea = styled.div<LinkAreaProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  font-size: 16px;
  text-align: right;
  background: white;
  padding: 4px 24px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
  border: ${({isSelected}) => isSelected ? '2px solid rgba(255, 132, 76, 0.8)' : '1px solid #d3d5da'};
`;

const LinkDisplay = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  color: #3D3D3D;
  cursor: text;
`;

export default SharedPage;