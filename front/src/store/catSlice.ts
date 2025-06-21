import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import catAPI from "../api/catAPI";
import { Cat, CatSliceData, RequestStatus } from "../types";

export const initialState: CatSliceData<Cat> = {
  list: [],
  current: null,
  status: RequestStatus.Idle,
  error: "",
  correlations:[]
};


export const fetchCats = createAsyncThunk(
  "fetchCats",
  catAPI.getCats
);

export const fetchCat = createAsyncThunk(
  "fetchCat",
  catAPI.getCat
);


const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
  },
  selectors: {
    selectCats: (sliceState) => sliceState.list,
    selectCorrelations: (sliceState) => sliceState.correlations,
    selectSliceState: (sliceState) => sliceState.status,
    selectError: (sliceState) => sliceState.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = "";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload];
        state.status = RequestStatus.SuccessLoadedList;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message!;
      })
      .addCase(fetchCat.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.current = null;
        state.error = "";
      })
      .addCase(fetchCat.fulfilled, (state, action) => {
        state.current = action.payload;
        if (!state.correlations.find(el=>el.id===action.payload.id))
          state.correlations.push({id:action.payload.id, URL:action.payload.url})
        state.status = RequestStatus.SuccessLoadedRecord;
      })
      .addCase(fetchCat.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message!;
      })
  },
});

export const {
  selectError,
  selectCats,
  selectCorrelations,
  selectSliceState,
} = catSlice.selectors;
export const { } = catSlice.actions;
export default catSlice.reducer;
