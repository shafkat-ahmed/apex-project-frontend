import {
  startTokenRefreshScheduler,
  stopTokenRefreshScheduler,
} from "../../scheduler/autoTokenScheduler";
import { stopInactivityWatcher } from "../../scheduler/inactivityScheduler";
import { login, refreshToken } from "../../services/api";
import { navigateTo } from "../../services/navigationService";
import { decodeJWT } from "../../utils/jwtDecoder";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export function loginAction(username, password) {
  return async (dispatch) => {
    try {
      const res = await login(username, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          expiresIn: res.data.expires_in,
          tokenType: res.data.token_type,
          user: decodeJWT(res.data.access_token),
        },
      });
      startTokenRefreshScheduler(res.data.expires_in, dispatch);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data || err };
    }
  };
}

export function refreshTokenAction() {
  return async (dispatch) => {
    try {
      const res = await refreshToken();

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          expiresIn: res.data.expires_in,
          tokenType: res.data.token_type,
          user: decodeJWT(res.data.access_token),
        },
      });
      startTokenRefreshScheduler(res.data.expires_in, dispatch);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data || err };
    }
  };
}

export function logout() {
  stopTokenRefreshScheduler();
  stopInactivityWatcher();
  navigateTo("/login");
  return { type: LOGOUT };
}
