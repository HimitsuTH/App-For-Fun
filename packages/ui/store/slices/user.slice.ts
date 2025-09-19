import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
  roles: {
    name: string
  };
  status: string
}

interface InitialState {
  loading: boolean;
  data: User | undefined;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: "",
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('action-------->',action)
        state.data = action.payload
    },
    cleanUser(state) {
        state.data = undefined
    }
  },
});


export const { setUser, cleanUser } = userSlice.actions
export default userSlice.reducer;