import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_shart_account')
export class AccoutDao extends BaseDao {
    @Sql('select * from iot_shart_account where `id` = ?')
    async getUserById(id: number) {}
}
