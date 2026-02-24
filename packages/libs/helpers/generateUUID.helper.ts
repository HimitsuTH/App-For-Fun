import { v4 as uuidv4 } from 'uuid';


export const generateUnsafeDigitFromUUID =(): number => {

  const fullUuid = uuidv4().replace(/-/g, ''); 

  return parseInt(fullUuid, 16);
}

