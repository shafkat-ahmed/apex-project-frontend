const initialState = {
  activeRequests: 0,
  isLoading: false,
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case "loader/start":
      return {
        ...state,
        activeRequests: state.activeRequests + 1,
        isLoading: true,
      };

    case "loader/stop":
      const updated = state.activeRequests - 1;
      return {
        ...state,
        activeRequests: updated,
        isLoading: updated > 0,
      };

    default:
      return state;
  }
}
