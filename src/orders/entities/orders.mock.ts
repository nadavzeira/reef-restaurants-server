import { Guid } from 'guid-typescript';
import couponsMock from 'src/coupons/entities/coupon.mock';
import menuItemsMock from 'src/menu-items/entities/menu-items.mock';
import { defaultStorefront } from 'src/storefronts/entities/storefronts.mock';

import { Order } from './order.entity';

export const defaultOrder: Order = {
  id: Guid.create(),
  customerName: '',
  customerAddress: '',
  storefront: defaultStorefront,
  items: menuItemsMock,
  coupons: couponsMock,
};

let ordersMock: Order[] = [];

for (let i = 1; i <= 5; i++) {
  const singleOrderMock = {
    ...defaultOrder,
    name: `Order #${i}`,
  };

  ordersMock = [...ordersMock, singleOrderMock];
}

export default ordersMock;
