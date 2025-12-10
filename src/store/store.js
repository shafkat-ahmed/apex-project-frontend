import { applyMiddleware, createStore } from "redux";

import { thunk } from "redux-thunk";
import { startInactivityWatcher } from "../scheduler/inactivityScheduler";
import { setStore } from "../services/api";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

startInactivityWatcher(store);
setStore(store);

export default store;
