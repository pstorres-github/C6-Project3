import './Defaults.css'
import './TableContainer.css'
import React from 'react'
import {useTable, useFilters, useSortBy, usePagination} from 'react-table'

/* Code is based on react-table library requirements as per website: https://react-table.tanstack.com/ */

const TableContainer = ({columns, data}) => {

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      //rows,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page
  
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },

    } = useTable({
      columns,
      data,
      defaultColumn: {Filter: DefaultColumnFilter},
      initialState: {pageIndex: 0}
    }, 
    useFilters, 
    useSortBy, 
    usePagination)

    /* displays sorting indicator icon on table header if table header is clicked on */
    const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? " ⬇" : " ⬆") : ""
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
                  </div>
                  <Filter column={column} />
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


/* code for search filters */

export const Filter = ({column}) => {
    return (
      <div style={{ marginTop: 5 }}>
        {column.canFilter && column.render("Filter")}
      </div>
    )
  }

 const DefaultColumnFilter = ({
    column: {
      filterValue,
      setFilter,
      preFilteredRows: { length },
    },
  }) => {
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`search ...`}
      />
    )
  }

  export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    return (
      <select
        id="custom-select"
        type="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
