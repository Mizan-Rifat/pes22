import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userUpdated } from './usersSlice';

export const fetchPermissions = createAsyncThunk(
  'permissions/fetch_permissions',
  async (_, { rejectWithValue }) => {
    try {
      const permissions = await axios.get(
        `${process.env.MIX_DOMAIN}/api/permissions`
      );
      return permissions;
    } catch (error) {
      return rejectWithValue(error);
    }
    // const permissions = await axios
    //   .get(`${process.env.MIX_DOMAIN}/api/permissions`)
    //   .catch(err => {
    //     console.log([err]);
    //     return Promise.reject(err);
    //   });
    // console.log({ permissions });
    // return permissions;
  }
);

export const fetchPermission = createAsyncThunk(
  'permissions/fetch_permission',
  async (permissionId, { rejectWithValue }) => {
    try {
      const permission = await axios.get(
        `${process.env.MIX_DOMAIN}/api/permissions/${permissionId}`
      );
      console.log({ permission });
      return permission;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPermission = createAsyncThunk(
  'permissions/add_permission',
  async ({ formData, setError }, { rejectWithValue }) => {
    try {
      const permission = await axios.post(
        `${process.env.MIX_DOMAIN}/api/permissions`,
        formData
      );
      toast.success('Successfully created.');
      return permission;
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

export const updatePermission = createAsyncThunk(
  'permissions/update_permission',
  async ({ permissionId, formData, setError }, { rejectWithValue }) => {
    try {
      const permission = await axios.put(
        `${process.env.MIX_DOMAIN}/api/permissions/${permissionId}`,
        formData
      );
      toast.success('Successfully updated.');
      return permission;
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

export const deletePermission = createAsyncThunk(
  'permissions/delete_permission',
  async (permissionId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${process.env.MIX_DOMAIN}/api/permissions/${permissionId}`
      );
      toast.success('Successfully deleted.');
      return permissionId;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updateUserPermissions = createAsyncThunk(
  'roles/update_user_permissions',
  async ({ formData, setError }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        `${process.env.MIX_DOMAIN}/api/user/role`,
        formData
      );
      console.log({ res });
      dispatch(userUpdated(res.data.data));
      toast.success('Successfully updated.');
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

export const counterSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    permission: {},
    openDialog: false,
    fetching: true,
    loading: false
  },
  reducers: {
    permissionsFetched: (state, action) => {
      state.permissions = action.payload.permissions;
      state.fetching = false;
      state.loading = false;
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
      .addCase(fetchPermissions.pending, state => {
        state.fetching = true;
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload.data;
        state.fetching = false;
        state.loading = false;
      })
      .addCase(updatePermission.pending, state => {
        state.loading = true;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.permission = action.payload.data;
        state.openDialog = false;
        state.loading = false;
      })
      .addCase(updatePermission.rejected, state => {
        state.loading = false;
      })
      .addCase(addPermission.pending, state => {
        state.loading = true;
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload.data);
        state.openDialog = false;
        state.loading = false;
      })
      .addCase(addPermission.rejected, state => {
        state.loading = false;
      })
      .addCase(deletePermission.pending, state => {
        state.loading = true;
      })
      .addCase(deletePermission.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.permissions = state.permissions.filter(
          permission => permission.id !== payload
        );
        state.loading = false;
      })
      .addCase(deletePermission.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchPermission.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.permission = action.payload.data.data;
        state.fetching = false;
        state.loading = false;
      })
      .addCase(updateUserPermissions.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserPermissions.fulfilled, state => {
        state.loading = false;
      });
  }
});

export const { showDialog, closeDialog } = counterSlice.actions;

export default counterSlice.reducer;
