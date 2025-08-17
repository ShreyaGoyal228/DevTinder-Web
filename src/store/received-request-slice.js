import { createSlice } from "@reduxjs/toolkit";

export const receivedRequestSlice = createSlice({
  name: "receivedRequest",
  initialState: null,
  reducers: {
    addReceivedReq: (state, action) => {
      return action.payload;
    },
    removeReceivedReq: (state, action) => {
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { addReceivedReq, removeReceivedReq } =
  receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;
