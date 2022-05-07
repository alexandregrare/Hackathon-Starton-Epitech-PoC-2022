import styled from "styled-components";
import React, {useCallback, useEffect, useState} from "react";

const Home = (): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    console.log(isDragOver);
  }, [isDragOver]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, [isDragOver]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    console.log('DROP')
  }, [])

  return (
    <Container>
      <Background src={'/assets/back4.svg'} />
      <UploaderContainer>
        <DropArea
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragEnd}
        >
          {!isDragOver ?
            <>
              <AddFileIcon src={'/assets/add_file.svg'} />
              <PrincipalDescription>Drag & drop <ImportantWord>images</ImportantWord>, <ImportantWord>videos</ImportantWord> or any <ImportantWord>file</ImportantWord></PrincipalDescription>
              <SecondaryDescription>or <ImportantWordLink>browse file</ImportantWordLink> on your computer</SecondaryDescription>
            </> :
            <DragOverContainer />
          }
        </DropArea>
        <Button>Upload</Button>
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

interface DropAreaProps {
  isDragOver: boolean;
}

const DropArea = styled.div<DropAreaProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  border: 3px rgba(155, 0, 59, 0.3) dashed;
  border-radius: 28px;
  padding: ${({ isDragOver }) => !isDragOver ? '24px' : 'unset'} ;
  box-sizing: border-box;
  overflow-y: hidden;
`;

const AddFileIcon = styled.img`
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

const Button = styled.div`
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

const DragOverContainer = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(155, 0, 59, 0.3);
`;

export default Home;