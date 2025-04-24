const BASE_URL = "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

const AUTH = {
  LOGIN_MANUAL: `${BASE_URL}/inanhtructuyen/auth/login-email`,
  LOGIN_MANUAL_PHONE: `${BASE_URL}/inanhtructuyen/auth/login-phone`,
  LOGIN_WITH_GOOGLE: `${BASE_URL}/inanhtructuyen/auth/login/google`,
};

const ACCOUNT = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/account`,
  GET_ACCOUNT_BY_ID: `${BASE_URL}/inanhtructuyen/account`,
  UPDATE: `${BASE_URL}/inanhtructuyen/account/update`,
  CHANGE_PASSWORD: `${BASE_URL}/inanhtructuyen/account/change-password`,
};

const PRODUCT = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/product`,
  GET_PRODUCT_BY_ID: `${BASE_URL}/inanhtructuyen/product`,
};

const BLOG = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/blog`,
};

const ORDER = {
  GET_ALL: `${BASE_URL}/inanhtructuyen/order`,
  GET_ALL_ORDER_BY_ID: `${BASE_URL}/inanhtructuyen/order/get-all`,
  GET_ORDER_BY_ID: `${BASE_URL}/inanhtructuyen/order`,
  UPDATE_ORDER: `${BASE_URL}/inanhtructuyen/order`,
  CREATE: `${BASE_URL}/inanhtructuyen/order`,
  CREATE_NO_LOGIN: `${BASE_URL}/inanhtructuyen/order/no-login`,
  CREATE_ALBUM: `${BASE_URL}/inanhtructuyen/order-album`,
  CREATE_ALBUM_NO_LOGIN: `${BASE_URL}/inanhtructuyen/order-album/no-login`,
  DISCOUNT_CHECK: `${BASE_URL}/inanhtructuyen/discount`,
};

const MOBILE = {
  SMOOTH_SKIN: `${BASE_URL}/inanhtructuyen/helper/smooth-skin`,
  REMOVE_BACKGROUND: `${BASE_URL}/inanhtructuyen/helper/background-remove`,
  INCREASE_QUALITY: `${BASE_URL}/inanhtructuyen/helper/enhance`,
  IMAGE_AI: `${BASE_URL}/inanhtructuyen/helper/image-ai`,
};

export const API = {
  AUTH,
  ACCOUNT,
  BLOG,
  PRODUCT,
  ORDER,
  MOBILE,
};
