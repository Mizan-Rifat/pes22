import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchUsers = createAsyncThunk('users/fetch_users', async () => {
  const users = await axios
    .get(`${process.env.MIX_DOMAIN}/api/users`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  console.log({ users });
  return users;
});

export const fetchUser = createAsyncThunk('users/fetch_user', async userId => {
  const user = await axios
    .get(`${process.env.MIX_DOMAIN}/api/users/${userId}`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  console.log({ user });
  return user;
});

export const updateUser = createAsyncThunk(
  'users/update_user',
  async ({ userId, formData, setError }, { rejectWithValue }) => {
    try {
      const user = await axios.put(
        `${process.env.MIX_DOMAIN}/api/users/${userId}`,
        formData
      );
      toast.success('Successfully updated.');
      return user;
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(error => {
          setError(error, {
            type: 'manual',
            message: errors[error]
          });
        });
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete_user',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.MIX_DOMAIN}/api/users/${userId}`);
      toast.success('Successfully deleted.');
      return userId;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
    openDialog: false,
    fetching: true,
    loading: false
  },
  reducers: {
    usersFetched: (state, action) => {
      state.users = action.payload.users;
      state.fetching = false;
      state.loading = false;
    },
    userUpdated: (state, action) => {
      state.user = action.payload;
    },
    showDialog: state => {
      state.openDialog = true;
    },
    closeDialog: state => {
      state.openDialog = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.fetching = true;
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.data;
        state.fetching = false;
        state.loading = false;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.openDialog = false;
        state.loading = false;
      })
      .addCase(updateUser.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.users = state.users.filter(user => user.id !== payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.fetching = false;
        state.loading = false;
      });
  }
});

export const { showDialog, closeDialog, userUpdated } = counterSlice.actions;

export default counterSlice.reducer;
