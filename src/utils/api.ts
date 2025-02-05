const BASE_URL = "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

const AUTH = {
  LOGIN_WITH_GOOGLE: `${BASE_URL}/inanhtructuyen/auth/login/google`,
};

const ACCOUNT = {
  GET_ALL: `${BASE_URL}/account/get-all`,
  UPDATE: `${BASE_URL}/account/update`,
};

const PRODUCT = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/product/`,
};

const BLOG = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/blog/`,
};

const ORDER = {
  GET_ALL: `${BASE_URL}/order/get-all`,
  CREATE: `${BASE_URL}/order/create`,
};

export const API = {
  AUTH,
  ACCOUNT,
  BLOG,
  PRODUCT,
  ORDER,
};
