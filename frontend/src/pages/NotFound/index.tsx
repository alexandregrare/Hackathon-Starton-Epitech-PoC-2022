import React, {useCallback} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Container>
      <Background src={'/assets/NotFound/back.svg'} />
      <ErrorContainer>
        <Title>404</Title>
        <WarningImage src={'/assets/NotFound/warning.svg'} />
        <Button onClick={handleClick} >Go back home</Button>
      </ErrorContainer>
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
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  object-position: 0 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 800px;
  height: 500px;
  background: white;
  border: 1px solid #E5E8E8;
  border-radius: 12px;
  z-index: 1;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  padding: 24px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  color: #3D3D3D;
  font-size: 100px;
`;

const WarningImage = styled.img`
  height: 150px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: #D14565;
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;

  :hover {
    background: rgba(209, 69, 101, 0.8);
  }
`;

export default NotFound;