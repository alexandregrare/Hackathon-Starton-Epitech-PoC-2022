interface GetByte2GigabyteProps {
  bytesValue?: number;
}

export const getSizeStatus = ({ bytesValue }: GetByte2GigabyteProps): boolean => {
  const value = bytesValue ? (bytesValue / (1000 * 1000 * 1000)) : 0;
  return value >= 4800000000;
}