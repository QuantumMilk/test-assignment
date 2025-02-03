import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';

@Module({
  imports: [HttpModule],
  controllers: [EvmController],
  providers: [EvmService],
})
export class EvmModule {}
