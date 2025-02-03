import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EvmService {
  private readonly jsonRcpUrl = 'https://haqq-evm-rpc.publicnode.com/';

  constructor(private readonly httpService: HttpService) {}

  async getBlockByHeight(height: number): Promise<any> {
    const hexHeight = '0x' + height.toString(16);

    const payload = {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [hexHeight, false],
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.jsonRcpUrl, payload)
      );
      const result = response.data.result;
      if (!result) {
        return null;
      }
      return {
        height: parseInt(result.number, 16),
        hash: result.hash,
        parentHash: result.parentHash,
        size: result.size ? parseInt(result.size, 16) : null,
        gasLimit: parseInt(result.gasLimit, 16),
        gasUsed: parseInt(result.gasUsed, 16),
        transactions: result.transactions
      };
    } catch (error) {
      console.error('Error fetching block:', error);
      return null;
    }
  }

  async getTransactionByHash(hash: string): Promise<any> {
    const payload = {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [hash],
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.jsonRcpUrl, payload)
      );
      const result = response.data.result;
      if (!result) {
        return null;
      }
      return {
        hash: result.hash,
        to: result.to,
        from: result.from,
        value: result.value,
        input: result.input,
        maxFeePerGas: result.maxFeePerGas,
        maxPriotityFeePerGas: result.maxPriotityFeePerGas,
        gasPrice: result.gasPrice,
      };
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    }
  }
}
