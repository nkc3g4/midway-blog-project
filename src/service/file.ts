import { Provide, Inject } from '@midwayjs/decorator';
import { OSSService } from '@midwayjs/oss';
import { join } from 'path';

@Provide()
export class FileService {
  @Inject()
  ossService: OSSService;

  async saveFile() {
    const localFile = join(__dirname, 'test.log');
    const result = await this.ossService.put('/test/test.log', localFile);
    return result.url;
    // => result.url
  }
}
