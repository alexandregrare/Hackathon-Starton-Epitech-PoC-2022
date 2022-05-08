import React from "react";
import styled from "styled-components";
import SuccessAnimation from "pages/Home/SharedPage/SuccessAnimation";

interface SharedPageProps {

}

const SharedPage = ({  }: SharedPageProps): JSX.Element => {
  return (
    <Container>
      <SuccessAnimation/>
      <SuccessMessage>File successfully <ImportantWord>uploaded</ImportantWord> !</SuccessMessage>
    </Container>
  )
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessMessage = styled.h1`
  margin: 0;
  color: #3D3D3D;
`;

const ImportantWord = styled.span`
  margin: 0;
  color: #FF844C;
`;

export default SharedPage;