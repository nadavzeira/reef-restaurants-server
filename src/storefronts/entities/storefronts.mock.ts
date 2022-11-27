import { Guid } from 'guid-typescript';

import { Storefront } from './storefront.entity';

export const defaultStorefront: Storefront = {
  id: Guid.create(),
  name: '',
  address: '',
  image: new Uint8Array(),
  zipCodes: [],
  menuItems: [],
  orders: [],
  coupons: [],
};

let storefrontsMock: Storefront[] = [];

for (let i = 1; i <= 10; i++) {
  const singleStorefrontMock: Storefront = {
    ...defaultStorefront,
    name: `Storefront #${i}`,
    zipCodes: [i],
  };

  storefrontsMock = [...storefrontsMock, singleStorefrontMock];
}

export default storefrontsMock;
