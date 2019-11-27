import { Request } from 'express';
import { extname } from 'path';
import { v4 } from 'uuid';

export const fileUploadFilter = (req: Request, file, callback) => {
  const fileFilterRegex = /\.(jpg|jpeg|png|gif|xls|xlsx|csv|txt)/;

  if (!file.originalname.match(fileFilterRegex)) {
    return callback(new Error('File not allowed'), false);
  }

  return callback(null, true);
};

export const fileUploadRename = (req: Request, file, callback) => {
  console.log('file', file);
  const extension = extname(file.originalname);
  return callback(null, `${v4()}${extension}`);
};
