import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_user')
export class UserDao extends BaseDao {
  @Sql('select * from iot_share_user where `id` = ?')
  async getUserById(id: number) {}
}
