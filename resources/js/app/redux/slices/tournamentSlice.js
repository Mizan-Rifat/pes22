import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetch_tournaments',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.MIX_DOMAIN}/api/tournaments`);
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTournament = createAsyncThunk(
  'tournaments/fetch_tournament',
  async (tournamentId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.MIX_DOMAIN}/api/tournaments/${tournamentId}`
      );
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/create_tournament',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.MIX_DOMAIN}/api/tournaments`,
        formData
      );
      console.log({ res });
      toast.success('Successfully created.');
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updateTournament = createAsyncThunk(
  'tournaments/update_tournament',
  async ({ tournamentId, formData }, { rejectWithValue }) => {
    console.log({ formData });
    try {
      const res = await axios.put(
        `${process.env.MIX_DOMAIN}/api/tournaments/${tournamentId}`,
        formData
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

export const deleteTournament = createAsyncThunk(
  'tournaments/delete_tournament',
  async (tournamentId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${process.env.MIX_DOMAIN}/api/tournaments/${tournamentId}`
      );
      toast.success('Successfully deleted.');
      return tournamentId;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: {
    tournaments: [],
    tournament: {},
    fetching: false,
    loading: false
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTournaments.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchTournaments.fulfilled, (state, { payload }) => {
        state.tournaments = payload;
        state.fetching = false;
      })
      .addCase(fetchTournaments.rejected, state => {
        state.fetching = false;
      })

      .addCase(fetchTournament.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchTournament.fulfilled, (state, { payload }) => {
        state.tournament = payload;
        state.fetching = false;
      })
      .addCase(fetchTournament.rejected, state => {
        state.fetching = false;
      })

      .addCase(createTournament.pending, state => {
        state.loading = true;
      })
      .addCase(createTournament.fulfilled, (state, { payload }) => {
        state.tournaments.push(payload);
        state.loading = false;
      })
      .addCase(createTournament.rejected, state => {
        state.loading = false;
      })

      .addCase(updateTournament.pending, state => {
        state.loading = true;
      })
      .addCase(updateTournament.fulfilled, (state, { payload }) => {
        // state.tournament = payload;
        state.loading = false;
      })
      .addCase(updateTournament.rejected, state => {
        state.loading = false;
      })

      .addCase(deleteTournament.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTournament.fulfilled, (state, { payload }) => {
        state.tournaments = state.tournaments.filter(
          tournament => tournament.id !== payload
        );
        state.loading = false;
      })
      .addCase(deleteTournament.rejected, state => {
        state.loading = false;
      });
  }
});

export default tournamentsSlice.reducer;
