// auth
const BASE = 'https://api.getmetasurvey.com/';
const API_PATH = `${BASE}api/auth/`;

const REGISTER = `${API_PATH}register`;
const LOGIN = `${API_PATH}login`;
const PASSWORD_RECOVER = `${API_PATH}password-recov`;
const RECOVERY = `${API_PATH}recovery`;
const REG_CONFIRM = `${API_PATH}regconfirm`;
const VALIDATE = `${BASE}api/admin/me`;

export {
  REGISTER,
  LOGIN,
  PASSWORD_RECOVER,
  RECOVERY,
  REG_CONFIRM,
  VALIDATE,
};
