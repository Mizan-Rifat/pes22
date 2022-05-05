import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchPlayerModels = createAsyncThunk(
  'playerModels/fetch_player_models',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.MIX_DOMAIN}/api/player-models`
      );
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPlayerModel = createAsyncThunk(
  'playerModels/fetch_player_model',
  async (playerModelId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.MIX_DOMAIN}/api/player-models/${playerModelId}`
      );
      console.log({ res });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPlayerModel = createAsyncThunk(
  'playerModels/add_playerModel',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.MIX_DOMAIN}/api/playerModels`,
        formData
      );
      toast.success('Successfully created.');
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updatePlayerModel = createAsyncThunk(
  'playerModels/update_player_model',
  async ({ playerModelId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${process.env.MIX_DOMAIN}/api/player-models/${playerModelId}`,
        formData
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updatePlayerAvatar = createAsyncThunk(
  'playerModels/update_player_avatar',
  async ({ playerModelId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.MIX_DOMAIN}/api/player-models/${playerModelId}`,
        formData
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const deletePlayerModel = createAsyncThunk(
  'playerModels/delete_playerModel',
  async (playerModelId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.MIX_DOMAIN}/api/player-models/${playerModelId}`
      );

      console.log({ res });
      toast.success(res.data.message);
      return playerModelId;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: 'playerModels',
  initialState: {
    playerModels: [],
    playerModel: {},
    fetching: false,
    loading: false
  },
  reducers: {
    playerModelsFetched: (state, action) => {
      state.playerModels = action.payload.playerModels;
      state.fetching = false;
      state.loading = false;
    },
    clearPlayerModel: state => {
      state.playerModel = {};
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlayerModels.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchPlayerModels.fulfilled, (state, { payload }) => {
        state.playerModels = payload;
        state.fetching = false;
      })
      .addCase(fetchPlayerModels.rejected, state => {
        state.fetching = false;
      })

      .addCase(updatePlayerModel.pending, state => {
        state.loading = true;
      })
      .addCase(updatePlayerModel.fulfilled, (state, { payload }) => {
        state.playerModel = payload;
        state.loading = false;
      })
      .addCase(updatePlayerModel.rejected, state => {
        state.loading = false;
      })
      .addCase(addPlayerModel.pending, state => {
        state.loading = true;
      })
      .addCase(addPlayerModel.fulfilled, (state, action) => {
        console.log({ action });
        state.playerModels.push(action.payload);
        state.loading = false;
      })
      .addCase(addPlayerModel.rejected, state => {
        state.loading = false;
      })
      .addCase(deletePlayerModel.pending, state => {
        state.loading = true;
      })
      .addCase(deletePlayerModel.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.playerModels = state.playerModels.filter(
          playerModel => playerModel.id !== payload
        );
        state.loading = false;
      })
      .addCase(deletePlayerModel.rejected, state => {
        state.loading = false;
      })

      .addCase(fetchPlayerModel.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchPlayerModel.fulfilled, (state, { payload }) => {
        state.playerModel = payload;
        state.fetching = false;
      })
      .addCase(fetchPlayerModel.rejected, state => {
        state.fetching = true;
      })

      .addCase(updatePlayerAvatar.pending, state => {
        state.loading = true;
      })
      .addCase(updatePlayerAvatar.fulfilled, (state, { payload }) => {
        state.playerModel = payload;
        state.loading = false;
      })
      .addCase(updatePlayerAvatar.rejected, state => {
        state.loading = true;
      });
  }
});

export default counterSlice.reducer;
