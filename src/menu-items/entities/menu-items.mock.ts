import { Guid } from 'guid-typescript';
import ordersMock from 'src/orders/entities/orders.mock';
import { defaultStorefront } from 'src/storefronts/entities/storefronts.mock';

import { MenuItem } from './menu-item.entity';

export const defaultMenuItem: MenuItem = {
  id: Guid.create(),
  name: '',
  price: NaN,
  storefront: defaultStorefront,
  orders: ordersMock,
};

const storefrontId: Guid = Guid.parse('7dad9a03-ecfb-4380-b41a-fb1e3be2d1c3');

let menuItemsMock: MenuItem[] = [];

for (let i = 1; i <= 8; i++) {
  const singleMenuItemMock: MenuItem = {
    ...defaultMenuItem,
    name: `MenuItem #${i}`,
    storefront:
      i % 2 === 0
        ? defaultMenuItem.storefront
        : {
            id: storefrontId,
            ...defaultMenuItem.storefront,
          },
  };

  menuItemsMock = [...menuItemsMock, singleMenuItemMock];
}

export default menuItemsMock;
