import './Defaults.css'
import './TableContainer.css'

import { useFilters, usePagination, useSortBy, useTable } from 'react-table'

import React from 'react'
import {useTable, useFilters, useSortBy, usePagination, useResizeColumns, useBlockLayout} from 'react-table'


// Ignore this for now
// import { library } from '@fortawesome/react-fontawesome'
// // FontAwesome Icon library initialization VDR



/* Code is based on react-table library requirements as per website: https://react-table.tanstack.com/ */

const TableContainer = ({columns, data}) => {

 
    const defaultColumn = React.useMemo(
      () => ({
        // if desired to override the default width for a column, this should be done in the parent component
        defaultWidth:300,
        minWidth: 100,
        maxWidth: 500,
        Filter: DefaultColumnFilter
      }),
      []
    )

  const {
      getTableProps,          // getProps is used to resolve any props that are required for the table wrapper
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, 
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },

    } = useTable({  // useTable is the root hook
      columns,
      data,
      defaultColumn,
      initialState: {pageIndex: 0}
      }, 
        // additional hooks to use the table features
        useResizeColumns,
        useBlockLayout,
        useFilters, 
        useSortBy, 
        usePagination
    )


    /* displays sorting indicator icon on table header if table header is clicked on */
    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' ⬇' : ' ⬆') : ''
    }

    return (
      <div className = "table-container">
      
      {/* table body */}
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div  {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                     {generateSortingIndicator(column)}
                     <Filter column={column} />
                  </div>
                <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? 'isResizing' : ''}`}/>
                              
                </th>
                     
            ))}
            </tr>
        ))}
        </thead>

        <tbody {...getTableBodyProps()}>
        {page.map(row => {
            prepareRow(row)
            return (
            <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
            </tr>
            )
        })}
        </tbody>
      </table>
      
      {/* buttons for pagination */}
      <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}> {'<'} </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}> {'>'} </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
          <span> Page{' '} <strong> {pageIndex + 1} of {pageOptions.length} </strong> &nbsp; </span>
      
          <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
          >
              {[5, 10, 15].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
          </select>
      </div>
    </div>
  )
}
export default TableContainer


// ----  THIS CODE IS FOR THE FILTERS USED IN THE TABLE COMPONENT ------

/* code for search filters */
export const Filter = ({column}) => {
    return (
        <div className="filter-search-box-cell" style={{ marginTop: 5 }}>
            {column.canFilter && column.render('Filter')}
        </div>
    )
}

 /* for text input filter-search box */
const DefaultColumnFilter = ({
    column: {
        filterValue,
        setFilter,
        preFilteredRows: { length }
    }
}) => {
    return (
      <input className ="input-search-box"
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`search ...`}
      />
    )
}

  /* for dropdown filter-search box */
  export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    return (
        <select
            id="custom-select"
            type="select"
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
