import styled from "styled-components";
import React from "react";

const Home = (): JSX.Element => {
  return (
    <Container>
      <Background src={'/assets/back4.svg'} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Background = styled.img`
  position: absolute;
  height: 100%;
`;

export default Home;