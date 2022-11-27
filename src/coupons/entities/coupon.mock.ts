import { Guid } from 'guid-typescript';
import { defaultOrder } from 'src/orders/entities/orders.mock';
import storefrontsMock, { defaultStorefront } from 'src/storefronts/entities/storefronts.mock';

import { Coupon } from './coupon.entity';

export const defaultCoupon: Coupon = {
  id: Guid.create(),
  type: '',
  discount: 10,
  storefronts: storefrontsMock,
  order: defaultOrder,
};

let couponsMock: Coupon[] = [];

for (let i = 1; i <= 5; i++) {
  const singleCouponMock = {
    ...defaultCoupon,
    name: `Coupon #${i}`,
  };

  couponsMock = [...couponsMock, singleCouponMock];
}

export default couponsMock;
