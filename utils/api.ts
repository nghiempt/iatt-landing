const BASE_URL = "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

const AUTH = {
  LOGIN_MANUAL: `${BASE_URL}/inanhtructuyen/auth/login-email`,
  LOGIN_MANUAL_PHONE: `${BASE_URL}/inanhtructuyen/auth/login-phone`,
  LOGIN_WITH_GOOGLE: `${BASE_URL}/inanhtructuyen/auth/login/google`,
};

const ACCOUNT = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/account/`,
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
  GET_ORDER_BY_ID: `${BASE_URL}/inanhtructuyen/order/get-all`,
  CREATE: `${BASE_URL}/inanhtructuyen/order/`,
  CREATE_NO_LOGIN: `${BASE_URL}/inanhtructuyen/order/no-login`,
};

export const API = {
  AUTH,
  ACCOUNT,
  BLOG,
  PRODUCT,
  ORDER,
};
