import React, {useCallback, useEffect, useRef, useState} from "react";
import {generatePassword} from "utils/generatePassword";
import {FileDataType} from "pages/Home/DropPage";
import {pushFile} from "client/pushFile";
import {Button} from "pages/Home/index";
import styled from "styled-components";

interface SuccessPageProps {
  passwordValue: string;
  fileData: FileDataType;
  setId: (str: string) => void;
  setPasswordValue: (str: string) => void;
  setReloadStatus: (bool: boolean) => void;
  setSharedPageStatus: (bool: boolean) => void;
}

const SuccessPage = ({ setId, passwordValue, fileData, setPasswordValue, setReloadStatus, setSharedPageStatus }: SuccessPageProps): JSX.Element => {
  const [status, setStatus] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (status && passwordRef) {
      passwordRef.current.focus();
    } else if (passwordRef) {
      passwordRef.current.blur();
    }
  }, [passwordRef, status]);

  const handleChangeStatus = useCallback((e) => {
    setStatus(e?.target?.checked);
  }, []);

  const handleClick = useCallback(() => {
    if (status && passwordValue.length !== 0) {
      const id = pushFile({fileData, password: passwordValue});
      if (id) {
        id.then(value => setId(value));
        setSharedPageStatus(true);
      }
    } else if (!status) {
      const password = generatePassword()
      setPasswordValue(password);
      const id = pushFile({fileData, password});
      if (id) {
        id.then(value => setId(value));
        setSharedPageStatus(true);
      }
    } else {
      setSharedPageStatus(false);
    }
  }, [setSharedPageStatus, status, passwordValue, fileData])

  const handleChangeValue = useCallback((e) => {
    setPasswordValue(e.target.value);
  }, [setPasswordValue])

  return (
    <Container>
      <Icon src={'/assets/password.svg'} />
      <Title>Would you like to use a personalized password for your document?</Title>
      <FormContainer>
        <Choice onChange={handleChangeStatus} type={'checkbox'} />
        <Text>I use my own password.</Text>
      </FormContainer>
      <Input
        ref={passwordRef}
        isDisplayed={status}
        value={passwordValue}
        onChange={handleChangeValue}
        placeholder={'Type your password... This will be used to encrypt your document.'}
      />
      <Button isNotClickable={status && passwordValue.length === 0} onClick={handleClick} >Next step</Button>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.img`
  width: 200px;
  filter: drop-shadow(10px 10px 8px rgba(220, 219, 219, 0.4));
`;

const Title = styled.h1`
  color: #3D3D3D;
  margin: 0;
  font-size: 16px;
  width: 100%;
`;

const FormContainer = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Choice = styled.input`
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0 0 0 12px;
  color: #949494;
  font-size: 12px;
  cursor: pointer;
`;

interface InputProps {
  isDisplayed: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  border: 1px solid #E5E8E8;
  border-radius: 8px;
  opacity: ${({ isDisplayed }) => isDisplayed ? '1' : '0'};
  padding: 4px 12px;
  box-sizing: border-box;
  font-size: 14px;
  background: white;


  :focus {
    outline: none;
    border: 2px solid rgba(255, 132, 76, 0.8);
  }
`;

export default SuccessPage;