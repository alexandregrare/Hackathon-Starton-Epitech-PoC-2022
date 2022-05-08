import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {Button} from "pages/Home/index";
import { postFileIpfs } from "../../../server/postRoutes";
import { getFileIpfs } from "../../../server/getRoutes";

interface DropPageProps {
  setIsUpload: (bool: boolean) => void;
}

const DropPage = ({ setIsUpload }: DropPageProps): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);

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
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    console.log(e.target.files[0])
    reader.onloadend = () => {
      console.log('DONE', reader);
      // @ts-ignore
      const view = new Int8Array(reader.result);
      console.log(view.toString());
    };
  }, []);

  const handleUpload = useCallback(() => {
    setIsDragOver(false);
    setIsUpload(true);
  }, [])

  return (
    <>
      <DropArea
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
      >
        {!isDragOver ?
          <>
            <Input onChange={handleChangeInput} type={'file'}/>
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
`;

export default DropPage;