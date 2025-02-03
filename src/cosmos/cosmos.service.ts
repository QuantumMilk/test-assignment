import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class CosmosService {
  private readonly cosmosRpcUrl = 'https://cosmos-rpc.publicnode.com:443';

  constructor(private readonly httpService: HttpService) {}

  async getBlockByHeight(height: number): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.cosmosRpcUrl}/block?height=${height}`)
      );
      const result = response.data.result;
      if (!result || !result.block || !result.block.header || !result.block_id) {
        return null;
      }
      const header = result.block.header;
      return {
        height: parseInt(header.height, 10),
        time: header.time,
        hash: result.block_id.hash,
        proposedAddress: header.proposer_address,
      };
    } catch (error) {
      console.error('Error fetching cosmos block:', error);
      return null;
    }
  }

  async getTransactionByHash(hash: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.cosmosRpcUrl}/tx?hash=${hash}&prove=${false}`)
      );
      const txData = response.data;
      if (!txData) {
        return null;
      }
      return {
        hash: txData.txhash,
        height: parseInt(txData.height, 10),
        time: txData.timestamp,
        gasUsed: txData.gas_used,
        gasWanted: txData.gas_wanted,
        fee: txData.tx?.value?.fee || null,
        sender: txData.tx?.value?.msg?.[0]?.from_address || null,
      };
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    }
  }
}
