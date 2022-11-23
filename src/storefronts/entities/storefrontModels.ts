export type imageTypes = 'png' | 'jpeg' | 'jpg';
export type Base64<imageType extends string> =
  `data:image/${imageType};base64${string}`;
