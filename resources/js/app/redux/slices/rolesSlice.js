import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userUpdated } from './usersSlice';

export const fetchRoles = createAsyncThunk('roles/fetch_roles', async () => {
  const roles = await axios
    .get(`${process.env.MIX_DOMAIN}/api/roles`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  console.log({ roles });
  return roles.data;
});

export const fetchRole = createAsyncThunk('roles/fetch_role', async roleId => {
  const role = await axios
    .get(`${process.env.MIX_DOMAIN}/api/roles/${roleId}`)
    .catch(err => {
      console.log([err]);
      return Promise.reject();
    });
  return role;
});

export const addRole = createAsyncThunk(
  'roles/add_role',
  async ({ formData, setError }, { rejectWithValue }) => {
    try {
      const role = await axios.post(
        `${process.env.MIX_DOMAIN}/api/roles`,
        formData
      );
      toast.success('Successfully created.');
      return role;
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

export const updateUserRoles = createAsyncThunk(
  'roles/update_user_role',
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

export const updateRole = createAsyncThunk(
  'roles/update_role',
  async ({ roleId, formData, setError }, { rejectWithValue }) => {
    try {
      const role = await axios.put(
        `${process.env.MIX_DOMAIN}/api/roles/${roleId}`,
        formData
      );
      toast.success('Successfully updated.');
      return role;
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

export const updateRolePermissions = createAsyncThunk(
  'roles/update_role_permissions',
  async ({ formData, setError }, { rejectWithValue }) => {
    console.log({ formData });
    try {
      // await axios.get('/sanctum/csrf-cookie');
      const role = await axios.post(
        `${process.env.MIX_DOMAIN}/api/role/permission`,
        formData
      );

      console.log({ role });
      toast.success('Successfully updated.');
      return role.data;
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

export const deleteRole = createAsyncThunk(
  'roles/delete_role',
  async (roleId, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.MIX_DOMAIN}/api/roles/${roleId}`);
      toast.success('Successfully deleted.');
      return roleId;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    role: {},
    openDialog: false,
    fetching: false,
    loading: false
  },
  reducers: {
    rolesFetched: (state, action) => {
      state.roles = action.payload.roles;
      state.fetching = false;
      state.loading = false;
    },
    clearRole: state => {
      state.role = {};
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
        state.role = action.payload.data;
        state.openDialog = false;
        state.loading = false;
      })
      .addCase(updateRole.rejected, state => {
        state.loading = false;
      })
      .addCase(addRole.pending, state => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload.data);
        state.openDialog = false;
        state.loading = false;
      })
      .addCase(addRole.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteRole.pending, state => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.roles = state.roles.filter(role => role.id !== payload);
        state.loading = false;
      })
      .addCase(deleteRole.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchRole.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload.data.data;
        state.fetching = false;
        state.loading = false;
      })
      .addCase(updateUserRoles.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserRoles.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateRolePermissions.pending, state => {
        state.loading = true;
      })
      .addCase(updateRolePermissions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.role = payload;
      })
      .addCase(updateRolePermissions.rejected, state => {
        state.loading = false;
      });
  }
});

export const { showDialog, closeDialog, clearRole } = counterSlice.actions;

export default counterSlice.reducer;
