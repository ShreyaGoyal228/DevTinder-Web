import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import feedReducer from "./feed-slice";
import connectionReducer from "./connections-slice";
import receivedRequestReducer  from "./received-request-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    receivedRequest:receivedRequestReducer
  },
});
