import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_directive')
export class DirectiveDao extends BaseDao {
  @Sql('select * from iot_share_directive where `id` = ?')
  async getBikeDirective(id): Promise<any> {}
}
