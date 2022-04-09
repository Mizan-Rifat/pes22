import React from 'react';
import { Grid } from '@mui/material';

const DetailsGrid = ({ data, fullColumn }) => {
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
          sx={{
            borderBottom: theme => `1px solid ${theme.palette.grey[300]}`
          }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              md={fullColumn ? 3 : isLastOddItem(index) ? 3 : 6}
              sx={{ p: 2 }}
            >
              <p style={{ fontWeight: 400, margin: 0 }}>{item.label}</p>
            </Grid>
            <Grid
              item
              xs={6}
              md={fullColumn ? 9 : isLastOddItem(index) ? 9 : 6}
              sx={{ p: 2 }}
            >
              {item.render ? (
                item.render
              ) : (
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailsGrid;
