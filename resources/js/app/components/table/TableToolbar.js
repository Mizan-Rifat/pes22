import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import TableSearchBox from './TableSearchBox';

const TableToolbar = ({
  selectedRowIds: selectedIds,
  title,
  search,
  globalFilter,
  setGlobalFilter,
  bulkActions
}) => {
  const [action, setAction] = useState('');

  const numSelected = Object.keys(selectedIds).length;
  const selectedRowIds = Object.keys(selectedIds);

  return (
    <Toolbar
      sx={{
        my: 2,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              autoWidth
              displayEmpty
              sx={{ pl: 0.5, '& .MuiSelect-select': { padding: '5.5px' } }}
              value={action}
              onChange={e => setAction(e.target.value)}
            >
              <MenuItem value="" disabled>
                <em>Action</em>
              </MenuItem>
              {Object.keys(bulkActions).map(action => (
                <MenuItem key={action} value={action}>
                  {bulkActions[action].title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            onClick={() => bulkActions[action]?.handler(selectedRowIds)}
          >
            Apply
          </Button>
        </>
      ) : (
        search && (
          <TableSearchBox
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )
      )}
    </Toolbar>
  );
};

export default TableToolbar;
