import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_user')
export class UserDao extends BaseDao {
  @Sql('select * from iot_share_user where `user_phone` = ? and `password` = ?')
  async login(userPhone: string, password: string): Promise<any> {}
}
