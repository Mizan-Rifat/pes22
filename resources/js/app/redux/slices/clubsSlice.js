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

export const updateClub = createAsyncThunk(
  'clubs/update_club',
  async ({ clubId, formData }, { rejectWithValue }) => {
    console.log({ formData });
    try {
      const res = await axios.post(
        `${process.env.MIX_DOMAIN}/api/clubs/${clubId}`,
        formData
        // {
        //   headers: { 'content-type': 'multipart/form-data' }
        // }
      );
      console.log({ res });
      toast.success('Successfully updated.');
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);

      return rejectWithValue(error);
    }
  }
);

export const deleteClub = createAsyncThunk(
  'clubs/delete_club',
  async (clubId, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.MIX_DOMAIN}/api/clubs/${clubId}`);
      toast.success('Successfully deleted.');
      return clubId;
    } catch (error) {
      toast.error(error.response.data.message);
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
    builder
      .addCase(fetchClubs.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchClubs.fulfilled, (state, { payload }) => {
        state.clubs = payload;
        state.fetching = false;
      })
      .addCase(fetchClubs.rejected, state => {
        state.fetching = false;
      })
      .addCase(fetchClub.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchClub.fulfilled, (state, { payload }) => {
        state.club = payload;
        state.fetching = false;
      })
      .addCase(fetchClub.rejected, state => {
        state.fetching = false;
      })
      .addCase(updateClub.pending, state => {
        state.loading = true;
      })
      .addCase(updateClub.fulfilled, (state, { payload }) => {
        state.club = payload;
        state.loading = false;
      })
      .addCase(updateClub.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteClub.pending, state => {
        state.loading = true;
      })
      .addCase(deleteClub.fulfilled, (state, { payload }) => {
        state.clubs = state.clubs.filter(club => club.id !== payload);
        state.loading = false;
      })
      .addCase(deleteClub.rejected, state => {
        state.loading = false;
      });
  }
});

// export const { showDialog, closeDialog } = clubsSlice.actions;

export default clubsSlice.reducer;
