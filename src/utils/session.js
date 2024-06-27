import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

let session = undefined;

export const login = (token) => {
  session = { token: token };
  const decodedToken = jwt.decode(token);
  Cookies.set('lastSignedInEmail', decodedToken?.user?.email);
};

export const logout = () => {
  session = undefined;
};

export const getSession = () => {
  if (!session) return false;
  return session;
};

// simple function for Routes to determine if we have a session.
export const haveSession = () => {
  const token = tokenVerify();
  console.debug(`haveSession() token: ${token}`);
  if (!token) return false;
  return true;
};

export const parseJWT = (token) => {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const tokenVerify = () => {
  if (!session) return;
  const decodedJWT = parseJWT(session.token);
  if (decodedJWT.exp * 1000 < Date.now()) {
    logout();
  } else {
    return session.token;
  }
};
