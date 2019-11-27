import { diskStorage } from 'multer';

import {
    Controller, Get, Logger, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { appHost, appPort } from './config/constants';
import { fileUploadFilter, fileUploadRename } from './utils/file-upload';

@Controller()
export class AppController {
  logger = new Logger('AppController');

  constructor() {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileUploadFilter,
      storage: diskStorage({
        destination: 'uploads',
        filename: fileUploadRename,
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    this.logger.debug(file);
    const { originalname, filename, size, path } = file;

    return {
      originalname,
      filename,
      size,
      path: `${appHost}:${appPort}/${path}`,
    };
  }

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter: fileUploadFilter,
      storage: diskStorage({
        destination: 'uploads',
        filename: fileUploadRename,
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files) {
    this.logger.debug(files);
    const uploaded = [];

    files.forEach(({ originalname, filename, size, path }) =>
      uploaded.push({
        originalname,
        filename,
        size,
        path: `${appHost}:${appPort}/${path}`,
      }),
    );

    return uploaded;
  }

  @Get('uploads/:path')
  getFile(@Param('path') path, @Res() res) {
    this.logger.debug(path);
    return res.sendFile(path, { root: 'uploads' });
  }
}
