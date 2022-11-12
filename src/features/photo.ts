import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Photo } from "../types/photo";

export const fetchPhotos = createAsyncThunk("/photos/fetchPhotos", async () => {
  const response = await fetch("https://pixabay.com/api/?key=16233721-b5c8760f37e4ecd64dc0c7b4a&q=yellow+flowers&image_type=photo&pretty=true");
  return response.json();
});

export type PhotosData = {
  data: Photo;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: PhotosData = {
  data: {
    total: 0,
    totalHits: 0,
    hits: [
      {
        id: 0,
        pageURL: "",
        type: "",
        tags: "",
        previewURL: "",
        previewWidth: 0,
        previewHeight: 0,
        webformatURL: "",
        webformatWidth: 0,
        webformatHeight: 0,
        largeImageURL: "",
        fullHDURL: "",
        imageURL: "",
        imageWidth: 0,
        imageHeight: 0,
        imageSize: 0,
        views: 0,
        downloads: 0,
        likes: 0,
        comments: 0,
        user_id: 0,
        user: 0,
        userImageURL: ""
      },
    ]
  },
  status: "idle",
  error: undefined,
};



export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectPhotos = (state: RootState) => state.photo;
export default photoSlice.reducer;