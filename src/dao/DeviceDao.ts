import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_device')
export class DeviceDao extends BaseDao {
  @Sql('select * from iot_share_device where `id` = ?')
  async getBikeDirective(id): Promise<any> {}
}
