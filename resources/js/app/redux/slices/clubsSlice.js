import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchClubs = createAsyncThunk(
  'clubs/fetch_clubs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.MIX_DOMAIN}/api/clubs`);
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchClub = createAsyncThunk(
  'clubs/fetch_club',
  async (clubId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.MIX_DOMAIN}/api/clubs/${clubId}`
      );
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    club: {},
    fetching: false,
    loading: false
  },
  reducers: {
    clubsFetched: (state, action) => {
      state.clubs = action.payload.permissions;
      state.fetching = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchClubs.pending, state => {
      state.fetching = true;
    });
    builder.addCase(fetchClubs.fulfilled, (state, { payload }) => {
      state.clubs = payload;
      state.fetching = false;
    });
    builder.addCase(fetchClubs.rejected, state => {
      state.fetching = false;
    });

    builder.addCase(fetchClub.pending, state => {
      state.fetching = true;
    });
    builder.addCase(fetchClub.fulfilled, (state, { payload }) => {
      state.club = payload;
      state.fetching = false;
    });
    builder.addCase(fetchClub.rejected, state => {
      state.fetching = false;
    });
  }
});

// export const { showDialog, closeDialog } = clubsSlice.actions;

export default clubsSlice.reducer;
