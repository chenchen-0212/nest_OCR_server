import { Injectable, Inject, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as Readable from 'stream';
import ocr_api20210707, * as $ocr_api20210707 from '@alicloud/ocr-api20210707';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { using } from 'rxjs';

@Injectable()
export class OcrService {
  @Inject()
  private readonly configService: ConfigService;

  createClient(): ocr_api20210707 {
    const accessKeyId = this.configService.get<string>(
      'ALIBABA_CLOUD_ACCESS_KEY_ID',
    );
    const accessKeySecret = this.configService.get<string>(
      'ALIBABA_CLOUD_ACCESS_KEY_SECRET',
    );

    const config = new $OpenApi.Config({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
    });
    config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;
    return new ocr_api20210707(config);
  }

  async recognizeImage(imageName: string): Promise<any> {
    const client = this.createClient();
    // const imageBuffer = fs.readFileSync(__dirname + '/../../test.png');
    const imageBuffer = fs.readFileSync(__dirname + '/../../uploads/' + imageName);
    const readable = new Readable.Readable();
    readable._read = () => { };
    readable.push(imageBuffer);
    readable.push(null);
    // console.log(imageBuffer);
    const recognizeBasicRequest = new $ocr_api20210707.RecognizeBasicRequest({
      body: readable,
      needRotate: false,
    });

    try {
      const resp = await client.recognizeBasicWithOptions(
        recognizeBasicRequest,
        new $Util.RuntimeOptions({}),
      );
      if(resp.statusCode === 200){
        const data : string = resp.body?.data || '';
        if(data.length > 0){
          return JSON.parse(data).content;
        } else {
          throw new Error('OCR识别失败');
        }
      } else {
        throw new Error('OCR识别失败');
      }
    } catch (error) {
      const err = error;
      console.log('OCR Error:', err.message);
      throw error;
    } finally {
      readable.destroy();
    }
  }

  async recognize(
    imageName: string = 'test.png',
  ): Promise<any> {
    return this.recognizeImage(imageName);
  }
}
