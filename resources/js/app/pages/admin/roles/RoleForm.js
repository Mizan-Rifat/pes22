import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { addRole, clearRole, updateRole } from 'app/redux/slices/rolesSlice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoleForm = ({ formId, type }) => {
  const { role } = useSelector(state => state.roles);
  const navigate = useNavigate();
  console.log({ role });
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    if (type === 'create') {
      await dispatch(addRole({ formData: data, setError }));
      navigate('/admin/roles');
    } else {
      await dispatch(updateRole({ roleId: role.id, formData: data, setError }));
    }
  };

  useEffect(() => {
    setValue('name', role.name || '');
    setValue('guard_name', role.guard_name || '');
    return () => {
      console.log('dsad');
      dispatch(clearRole());
    };
  }, [role]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 2 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        // defaultValue={type !== 'create' ? role.guard_name : undefined}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 2 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default RoleForm;
