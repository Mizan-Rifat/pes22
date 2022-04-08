import React from 'react';
import { Grid, Input } from '@mui/material';

const EditGrid = ({ data, fullColumn }) => {
  const isLastOddItem = index =>
    data.length % 2 !== 0 && index === data.length - 1;
  return (
    <Grid container spacing={0}>
      {data.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={fullColumn ? 12 : isLastOddItem(index) ? 12 : 6}
        >
          <Grid container>
            {/* <Grid
              item
              xs={3}
              md={fullColumn ? 2 : isLastOddItem(index) ? 3 : 6}
              sx={{ p: 2 }}
            >
              <p style={{ fontWeight: 400, margin: 0 }}>{item.label}</p>
            </Grid> */}
            <Grid xs={12} item sx={{ p: 2 }}>
              <Input fullWidth />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default EditGrid;
