import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import { Backdrop, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
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
  loading,
  selection = true,
  search = true,
  minRow = 5,
  title,
  rowActions = [],
  bulkActions = {}
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data,
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
  console.log({ page: headerGroups[0].headers });
  return (
    <TableContainer
      sx={{ px: 2, position: 'relative', opacity: loading ? 0.5 : 1 }}
    >
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          position: 'absolute',
          bgcolor: 'transparent'
        }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress />
      </Backdrop>
      <TableToolbar
        selectedRowIds={selectedRowIds}
        title={title}
        search={search}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        bulkActions={bulkActions}
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
                  <TableMenu rowId={row.original.id} rowActions={rowActions} />
                </TableCell>
              </TableRow>
            );
          })}

          {page.length < minRow && (
            <>
              {Array.from(Array(minRow - page.length).keys()).map(
                (item, index) => (
                  <TableRow>
                    <TableCell
                      sx={{ borderBottom: 'none' }}
                      colSpan={columns.length + 2}
                    >
                      {index === Math.floor(minRow / 2) &&
                        page.length === 0 && (
                          <Box sx={{ textAlign: 'center' }}>
                            No records to display
                          </Box>
                        )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </>
          )}
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
