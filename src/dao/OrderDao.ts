import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_order')
export class OrderDao extends BaseDao {
  @Sql('select count(*)  as total from iot_share_order where user_id = ?')
  async getTotalOrder(userId): Promise<any> {}

  @Sql(
    'select o.start_location, o.end_location, d.id as device_id, o.id, o.user_id, o.status,o.payment, o.ctime, d.device_name, d.number from iot_share_order as o  inner join iot_share_device as d on o.user_id = ? and o.tram_id = d.id order by ctime desc',
  )
  async findOrderListByUserId(userId): Promise<any> {}

  @Sql(
    'select  o.start_location, o.end_location,d.id as device_id, o.id, o.user_id, o.status, o.payment, o.ctime, d.device_name, d.number from iot_share_order as o  inner join iot_share_device as d on o.id = ? and o.tram_id = d.id ',
  )
  async findOrderById(id) {}
}
