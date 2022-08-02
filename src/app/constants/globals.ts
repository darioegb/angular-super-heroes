export const assetRoot = 'assets';
export const imgSrc = `${assetRoot}/imgs`;
export const idKey = 'id';
export const httpMethodKeys = {
  get: 'get',
  delete: 'delete',
  post: 'add',
  put: 'update',
};
export const defaultFormControlSizes = {
  text: {
    min: 3,
    max: 60,
  },
  email: {
    min: 10,
    max: 100,
  },
  number: {
    min: 1,
    max: 999_999_999,
  },
  textarea: {
    min: 10,
    max: 250,
  },
};
export const locales = [
  {
    key: 'English',
    value: 'en',
  },
  {
    key: 'Español',
    value: 'es',
  },
];
