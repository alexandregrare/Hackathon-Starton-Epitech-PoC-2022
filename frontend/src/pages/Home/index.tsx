import React, {useState} from "react";
import styled from "styled-components";
import SuccessPage from "pages/Home/SuccessPage";
import DropPage from "pages/Home/DropPage";
import SharedPage from "pages/Home/SharedPage";

const Home = (): JSX.Element => {
  const [sharedPageStatus, setSharedPageStatus] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  return (
    <Container>
      <Background src={'/assets/back4.svg'}/>
      <UploaderContainer>
        {sharedPageStatus ?
          <SharedPage /> : !isUpload ?
            <DropPage setIsUpload={setIsUpload}/> :
            <SuccessPage setSharedPageStatus={setSharedPageStatus}/>}
      </UploaderContainer>
    </Container>
  );
};

const Container = styled.div`
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

const Background = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const UploaderContainer = styled.div`
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
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  background: #FF844C;
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  font-weight: bold;

  :hover {
    background: rgba(255, 132, 76, 0.8);
  }
`;

export default Home;