import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Injectable
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OcrService } from './ocr.service';

// @Injectable()
// export class ImageFileValidator {
//   isValid(file: Express.Multer.File): boolean {
//     const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
//     const ext = extname(file.originalname).toLowerCase();
//     return allowedExtensions.includes(ext);
//   }
// }

@Controller('ocr')
export class OcrController {

  constructor(private readonly ocrService: OcrService) {}
    

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        // callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        callback(null, `${file.fieldname}-${ext}`);
      },
    }),
  }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
    const ext = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return {
        message: '不支持的文件格式',
        error: 'Bad Request',
        statusCode: 400
      };
    }

    // return {
    //   message: '上传成功',
    //   filePath: file.path,
    //   fileName: file.filename,
    // };

    const resp = await this.ocrService.recognizeImage(file.filename);
    return resp;
  }
}
