# Test assignment

## Assignment №1

Необходимо реализовать API:

- GET /evm/block/:height - Необходимо вернуть информацию о блоке по номеру блока (height, hash, parentHash, gasLimit, gasUsed, size). Ограничение: необходимо сделать только один запрос к JSON RPC.
- GET /evm/transactions/:hash - Необходимо вернуть информацию о транзакции по хешу (hash, to, from, value, input, maxFeePerGas, maxPriotityFeePerGas, gasPrice)


### Для evm использовал https://haqq-evm-rpc.publicnode.com/

- GET /cosmos/block/:height - Необходимо вернуть информацию о блоке по номеру блока ( height, time, hash, proposedAddress )
- GET /cosmos/transactions/:hash - Необходимо вернуть информацию о транзакции по хешу ( hash, height, time, gasUsed, gasWanted, fee, sender )

### Для cosmos https://cosmos-rpc.publicnode.com:443

Необходимо соблюдать общие принципы NestJS: структура модулей, использование валидации через pipe.

https://haqq-evm.publicnode.com/ - публичная нода, к котором можно подключиться
https://ethereum.github.io/execution-apis/api-documentation/ - документация api ноды

https://docs.cosmos.network/ - документация cosmos sdk
https://itrocket.net/services/mainnet/haqq/#rpc - GRPC, RPC, JSON-RPC для Haqq

## Assignment №2

Playground: https://onecompiler.com/postgresql/42p2cvd2s

Необходимо написать запрос для вытягивания транзакций с limit и сортировкой по block_height (Убывание).

Результат должен включать в себя все транзакции тех блоков, номера которых встречаются в списке при запросе:
```sql
select * from test_txs order by block_height DESC limit $1
```

При `$1 = 10` в выборке будут транзакции блоков 3 и 2, но в выборку не войду все транзакции блока 2. Переделай запрос в соотвествие с требования выше. Попробуй минимизировать cost запроса.

**Запрос сохраните в текстовом файле и прикрепите к общему тестовому заданию**
**Запрос хранится в query.txt**
