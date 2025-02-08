const BASE_URL = "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

const AUTH = {
  LOGIN_MANUAL: `${BASE_URL}/inanhtructuyen/auth/login`,
  LOGIN_WITH_GOOGLE: `${BASE_URL}/inanhtructuyen/auth/login/google`,
};

const ACCOUNT = {
  GET_ALL: `${BASE_URL}/account/get-all`,
  GET_ACCOUNT_BY_ID: `${BASE_URL}/inanhtructuyen/account`,
  UPDATE: `${BASE_URL}/inanhtructuyen/account/update`,
};

const PRODUCT = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/product/`,
  GET_PRODUCT_BY_ID: `${BASE_URL}/inanhtructuyen/product`,
};

const BLOG = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/blog/`,
};

const ORDER = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/order/`,
  CREATE: `${BASE_URL}/inanhtructuyen/order/`,
};

export const API = {
  AUTH,
  ACCOUNT,
  BLOG,
  PRODUCT,
  ORDER,
};
