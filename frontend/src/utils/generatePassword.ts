import {v4 as uuidv4} from 'uuid';

export const generatePassword = (): string => {
  return uuidv4();
}
