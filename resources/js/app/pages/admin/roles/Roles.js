import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Table,
  TextField
} from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React from 'react';
import EnhancedTable from 'app/components/table/Table';
import { Search } from '@mui/icons-material';

const Roles = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        cellProps: {
          component: 'th',
          scope: 'row',
          padding: 'none',
          align: 'left'
        },
        headerProps: {
          align: 'left',
          padding: 'none'
        }
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        headerProps: {
          align: 'right'
        },
        cellProps: {
          align: 'right'
        }
      },
      {
        Header: 'Age',
        accessor: 'age',
        headerProps: {
          align: 'right'
        },
        cellProps: {
          align: 'right'
        }
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        headerProps: {
          align: 'right'
        },
        cellProps: {
          align: 'right'
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        headerProps: {
          align: 'right'
        },
        cellProps: {
          align: 'right'
        }
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        headerProps: {
          align: 'right'
        },
        cellProps: {
          align: 'right'
        }
      }
    ],
    []
  );

  const [data, setData] = React.useState([
    {
      firstName: 'afternoon',
      lastName: 'humor',
      age: 23,
      visits: 21,
      progress: 53,
      status: 'single'
    },
    {
      firstName: 'door',
      lastName: 'cork',
      age: 25,
      visits: 30,
      progress: 50,
      status: 'complicated'
    },
    {
      firstName: 'chairs',
      lastName: 'departure',
      age: 17,
      visits: 42,
      progress: 19,
      status: 'complicated'
    },
    {
      firstName: 'arm',
      lastName: 'start',
      age: 21,
      visits: 85,
      progress: 92,
      status: 'complicated'
    },
    {
      firstName: 'surgery',
      lastName: 'physics',
      age: 23,
      visits: 16,
      progress: 15,
      status: 'single'
    },
    {
      firstName: 'surprise',
      lastName: 'orange',
      age: 8,
      visits: 31,
      progress: 36,
      status: 'complicated'
    },
    {
      firstName: 'robin',
      lastName: 'performance',
      age: 0,
      visits: 27,
      progress: 80,
      status: 'relationship'
    },
    {
      firstName: 'stem',
      lastName: 'shock',
      age: 16,
      visits: 9,
      progress: 11,
      status: 'complicated'
    },
    {
      firstName: 'tank',
      lastName: 'cushion',
      age: 3,
      visits: 0,
      progress: 95,
      status: 'single'
    },
    {
      firstName: 'sir',
      lastName: 'cover',
      age: 14,
      visits: 53,
      progress: 3,
      status: 'relationship'
    },
    {
      firstName: 'card',
      lastName: 'chess',
      age: 7,
      visits: 81,
      progress: 46,
      status: 'complicated'
    },
    {
      firstName: 'recipe',
      lastName: 'chairs',
      age: 26,
      visits: 5,
      progress: 96,
      status: 'relationship'
    },
    {
      firstName: 'inspector',
      lastName: 'bit',
      age: 12,
      visits: 5,
      progress: 23,
      status: 'relationship'
    },
    {
      firstName: 'river',
      lastName: 'money',
      age: 4,
      visits: 13,
      progress: 35,
      status: 'relationship'
    },
    {
      firstName: 'name',
      lastName: 'hands',
      age: 13,
      visits: 7,
      progress: 27,
      status: 'complicated'
    },
    {
      firstName: 'bathroom',
      lastName: 'drama',
      age: 10,
      visits: 3,
      progress: 24,
      status: 'relationship'
    },
    {
      firstName: 'ocean',
      lastName: 'effect',
      age: 11,
      visits: 59,
      progress: 63,
      status: 'single'
    },
    {
      firstName: 'road',
      lastName: 'cars',
      age: 16,
      visits: 58,
      progress: 56,
      status: 'single'
    },
    {
      firstName: 'historian',
      lastName: 'railway',
      age: 14,
      visits: 61,
      progress: 78,
      status: 'complicated'
    },
    {
      firstName: 'elbow',
      lastName: 'desk',
      age: 14,
      visits: 41,
      progress: 65,
      status: 'relationship'
    }
  ]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };
  return (
    <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
      <PaperHeader title="Roles" subTitle="Choose user roles" color="primary" />

      <Box sx={{ px: 2 }}>
        {/* <TableExample /> */}
        <EnhancedTable
          title="Roles"
          columns={columns}
          data={data}
          setData={setData}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </Box>
    </Paper>
  );
};

export default Roles;
