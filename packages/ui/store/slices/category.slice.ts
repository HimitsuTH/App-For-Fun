import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string
  name: string
}

interface InitialState {
  loading: boolean;
  data: Category[] | undefined;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: "",
};



const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      console.log('action-------->',action)
        state.data = action.payload.categories
    },
    cleanCategory(state) {
        state.data = undefined
    }
  },
});


export const { setCategory, cleanCategory } = categorySlice.actions
export default categorySlice.reducer;