import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CatLike, SliceData, RequestStatus } from "../types";
import catLikeAPI from "../api/catLikeAPI";

export const initialState: SliceData<CatLike> = {
  list: [],
  current: null,
  status: RequestStatus.Idle,
  error: "",
};


export const fetchCatLikes = createAsyncThunk(
  "fetchCatLikes",
  catLikeAPI.getCatLikes
);

export const postLike = createAsyncThunk(
  "postLike",
  catLikeAPI.postLike
);

export const deleteLike = createAsyncThunk(
  "deleteLike",
  catLikeAPI.deleteLike
);


const catLikeSlice = createSlice({
  name: "catLikes",
  initialState,
  reducers: {
  },
  selectors: {
    selectCatLikes: (sliceState) => sliceState.list,
    selectSliceState: (sliceState) => sliceState.status,
    selectError: (sliceState) => sliceState.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatLikes.pending, (state) => {
        state.list = []
        state.status = RequestStatus.Loading;
        state.error = "";
      })
      .addCase(fetchCatLikes.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.status = RequestStatus.SuccessLoadedList;
      })
      .addCase(fetchCatLikes.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message!;
      })
      .addCase(postLike.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = "";
      })
      .addCase(postLike.fulfilled, (state, action) => {
        const id = action.payload.id;
        if (!state.list.find(el=>el.cat_id===id))
          state.list.push({cat_id:id, created_at:new Date()})
        state.status = RequestStatus.Added;
      })
      .addCase(postLike.rejected, (state, action) => {
        state.status = RequestStatus.FailedAdd;
        state.error = action.error.message!;
      })
      .addCase(deleteLike.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = "";
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.list = state.list.filter(el=>el.cat_id!==id)
        state.status = RequestStatus.Deleted;
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.status = RequestStatus.FailedDelete;
        state.error = action.error.message!;
      })
  },
});

export const {
  selectError,
  selectCatLikes,
  selectSliceState,
} = catLikeSlice.selectors;
export const { } = catLikeSlice.actions;
export default catLikeSlice.reducer;
