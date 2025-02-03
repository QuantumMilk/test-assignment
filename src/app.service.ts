import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Используйте /{ cosmos | evm }/block/:height или /{ cosmos | evm }/transactions/:hash';
  }
}
