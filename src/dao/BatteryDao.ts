import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_battery')
export class BatteryDao extends BaseDao {
    @Sql('select * from iot_share_battery where `id` = ?')
    async getUserById(id: number) {}
}
