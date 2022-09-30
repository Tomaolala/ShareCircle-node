import { BaseDao, Dao, Sql } from '@snow';

@Dao('iot_share_pay')
export class PayDao extends BaseDao {
  @Sql('select sum(pay_money) as totalPay from iot_share_pay where `user_id` = ?')
  async getTotalPay(userId): Promise<any> {}
}
