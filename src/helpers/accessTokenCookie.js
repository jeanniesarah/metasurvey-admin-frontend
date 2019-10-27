// https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie';

export const accessTokenCookieName = 'accessToken';

export function setAccessTokenCookie(accessToken: any): void {
  //    accessToken is actually a string but TS doesn't compile it for some reason.
  Cookies.set(accessTokenCookieName, accessToken, { expires: 365 }); //expires in 1 year.
}

export function getAccessTokenCookie(): string | undefined {
  return Cookies.get(accessTokenCookieName);
}

export function removeAccessTokenCookie(): void {
  return Cookies.remove(accessTokenCookieName);
}
