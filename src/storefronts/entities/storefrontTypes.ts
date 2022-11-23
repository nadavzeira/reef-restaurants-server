export type imageTypes = 'png' | 'jpeg' | 'jpg';
export type Base64<imageType extends string> =
  `data:image/${imageType};base64${string}`;
export type CouponType = 'percentage' | 'sum';

export interface MenuItem {
  dish: string;
  price: number;
}

export interface Coupon {
  type: CouponType;
  discount: number;
}
