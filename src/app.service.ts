import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'UP';
  }
  getVersion(): string {
    return '1.0.7';
  }
}
