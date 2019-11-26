import {
    Controller, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  logger = new Logger('AppController');

  constructor() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    this.logger.debug(file);
  }

  @Get('image/:path')
  getFile(@Param('path') path, @Res() res) {
    this.logger.debug(path);
    return res.sendFile(path, { root: 'uploads' });
  }
}
