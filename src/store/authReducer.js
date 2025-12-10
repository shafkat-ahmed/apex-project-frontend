import { LOGIN_SUCCESS, LOGOUT } from "./actions/authAction";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  tokenType: "bearer",
  expiresIn: localStorage.getItem("expiresIn")
    ? parseInt(localStorage.getItem("expiresIn"))
    : 0,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticated: localStorage.getItem("isAuthenticated")
    ? localStorage.getItem("isAuthenticated") === "true"
    : false,
  role: localStorage.getItem("role"),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Save payload to localStorage
      const authData = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        tokenType: action.payload.tokenType,
        expiresIn: action.payload.expiresIn,
        user: action.payload.user,
        role: action.payload.user?.authorities[0],
      };

      localStorage.setItem("accessToken", authData.accessToken);
      localStorage.setItem("refreshToken", authData.refreshToken);
      localStorage.setItem("tokenType", authData.tokenType);
      localStorage.setItem("expiresIn", authData.expiresIn.toString());
      localStorage.setItem("user", JSON.stringify(authData.user));
      localStorage.setItem("role", authData.user?.authorities[0]);

      return {
        ...state,
        ...authData,
        isAuthenticated: true,
      };

    case LOGOUT:
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("user");

      window.location.href = "/login";
      return initialState;

    default:
      return state;
  }
}
