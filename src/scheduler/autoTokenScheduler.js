import { refreshTokenAction } from "../store/actions/authAction";

let refreshTimer = null;

export function startTokenRefreshScheduler(expiresIn = 900, dispatch) {
  if (refreshTimer) clearTimeout(refreshTimer);

  const refreshTimeMs = (expiresIn - 100) * 1000;

  refreshTimer = setTimeout(() => {
    dispatch(refreshTokenAction());
  }, refreshTimeMs);
}

export function stopTokenRefreshScheduler() {
  if (refreshTimer) clearTimeout(refreshTimer);
}
