import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { CosmosService } from './cosmos.service';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  async getBlockByHeight(@Param('height', ParseIntPipe) height: number) {
    const blockInfo = await this.cosmosService.getBlockByHeight(height);
    if (!blockInfo) {
      throw new BadRequestException('Block not found');
    }
    return blockInfo;
  }

  @Get('transactions/:hash')
  async getTransaction(@Param('hash') hash: string) {
    if (!/^([A-Fa-f0-9]{64})$/.test(hash)) {
      throw new BadRequestException('Invalid transaction hash format');
    }
    const txInfo = await this.cosmosService.getTransactionByHash(hash);
    if (!txInfo) {
      throw new BadRequestException('Transaction not found');
    }
    return txInfo;
  }
}
