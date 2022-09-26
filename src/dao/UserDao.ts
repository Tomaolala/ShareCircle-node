import { BaseDao, Dao, Sql } from '@snow';

@Dao('users')
export class UserDao extends BaseDao {
  @Sql('select * from users where `id` = ?')
  async getUserById(id: number) {}
}
