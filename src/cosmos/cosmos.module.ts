import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CosmosController } from './cosmos.controller';
import { CosmosService } from './cosmos.service';

@Module({
  imports: [HttpModule],
  controllers: [CosmosController],
  providers: [CosmosService],
})
export class CosmosModule {}
