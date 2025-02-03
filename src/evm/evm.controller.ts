import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { EvmService } from './evm.service';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('block/:height')
  async getBlock(@Param('height', ParseIntPipe) height: number) {
    const blockInfo = await this.evmService.getBlockByHeight(height);
    if (!blockInfo) {
      throw new BadRequestException('Block not found');
    }
    return blockInfo;
  }

  @Get('transactions/:hash')
  async getTransaction(@Param('hash') hash: string) {
    if (!/^0x([A-Fa-f0-9]{64})$/.test(hash)) {
      throw new BadRequestException('Invalid transaction hash format');
    }
    const txInfo = await this.evmService.getTransactionByHash(hash);
    if (!txInfo) {
      throw new BadRequestException('Transaction not found');
    }
    return txInfo;
  }
}
