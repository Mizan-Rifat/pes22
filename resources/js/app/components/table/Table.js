import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/materialTableFooter';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/materialTablePagination';
// import TablePaginationActions from './TablePaginationActions';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { alpha } from '@mui/material/styles';
// import TableToolbar from './TableToolbar';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  // TableFooter,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Delete,
  FilterList,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import TableSearchBox from './TableSearchBox';
import TableToolbar from './TableToolbar';
import TableFooter from './TableFooter';
import TableMenu from './TableMenu';
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox size="small" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const EnhancedTable = ({
  columns,
  data,
  perPage = 10,
  updateMyData,
  skipPageReset,
  selection = true,
  search = true,
  title
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      updateMyData,
      initialState: { pageSize: perPage ? perPage : data.length }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (selection) {
        hooks.allColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
          ...columns
        ]);
      }
    }
  );

  return (
    <TableContainer>
      <TableToolbar
        selectedRowIds={selectedRowIds}
        title={title}
        search={search}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead sx={{ color: theme => theme.palette.primary.main }}>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <TableCell
                    padding={column.id === 'selection' ? 'checkbox' : 'default'}
                    sortDirection={false}
                    {...(column.id === 'selection'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(
                          column.getSortByToggleProps(column.headerProps)
                        ))}
                  >
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    ) : (
                      column.render('Header')
                    )}
                  </TableCell>
                );
              })}
              <TableCell sx={{ pr: 0 }} sortDirection={false}>
                Action
              </TableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map(row => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell
                      padding={cell.column.id === 'selection' && 'checkbox'}
                      {...cell.getCellProps(cell.column.cellProps)}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
                <TableCell padding="checkbox" align="right">
                  <TableMenu />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter
          data={data}
          pageSize={pageSize}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          setPageSize={setPageSize}
        />
      </MaUTable>
    </TableContainer>
  );
};

export default EnhancedTable;
