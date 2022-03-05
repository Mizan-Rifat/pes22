import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchRoles = createAsyncThunk('roles/fetch_roles', async () => {
  const roles = await axios
    .get(`${process.env.MIX_DOMAIN}/api/roles`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  console.log({ roles });
  return roles;
});

export const fetchRole = createAsyncThunk('roles/fetch_role', async roleId => {
  const role = await axios
    .get(`${process.env.MIX_DOMAIN}/api/roles/${roleId}`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  console.log({ role });
  return role;
});

export const updateRole = createAsyncThunk(
  'roles/update_role',
  async ({ roleId, formData, setError }, { rejectWithValue }) => {
    const role = await axios
      .put(`${process.env.MIX_DOMAIN}/api/roles/${roleId}`, formData)
      .catch(err => {
        console.log({ err });
        if (err.response.status === 422) {
          const errors = err.response.data.errors;
          Object.keys(errors).forEach(error => {
            setError(error, {
              type: 'manual',
              message: errors[error]
            });
          });
        }
        toast.error(err.response.data.message);
        return rejectWithValue(err);
      });
    return role;
  }
);

export const counterSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    role: {},
    fetching: false,
    loading: false
  },
  reducers: {
    rolesFetched: (state, action) => {
      state.roles = action.payload.roles;
      state.fetching = false;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRoles.pending, state => {
        state.fetching = true;
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload.data;
        state.fetching = false;
        state.loading = false;
      })
      .addCase(updateRole.pending, state => {
        state.loading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        console.log('success');
        state.role = action.payload.data;
        state.loading = false;
        toast.success('Successfully updated.');
      })
      .addCase(updateRole.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchRole.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload.data;
        state.loading = false;
      });
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
