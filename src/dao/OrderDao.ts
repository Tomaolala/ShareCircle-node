import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_shart_order')
export class OrderDao extends BaseDao {
    @Sql('select * from iot_shart_order where `user_id` = ?')
    async getOrderById(id: number) {
        
    }
}
