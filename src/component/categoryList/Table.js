import { useDispatch, useSelector } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import DetailCategory from '../DetailCategory';
import CategoryAPI from '../../api/CategoryAPI';
import { setCategoryList, setStatePagingTable } from '../../redux/action';


// interface PropsTable {
//   columns: any,
//   data: any,
// }

const Tables = (({columns, data}) => {
  const dispatch = useDispatch();
  const paging = useSelector((state) => state.setStatePaging.paging);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,

    //pagination
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }

  } = useTable({ 
    columns,
    data, 
    initialState: { pageIndex: paging.page - 1, pageSize: paging.size },
    manualPagination: true,
    pageCount: 50
   } ,usePagination)



   async function getPrePage() {
    previousPage();
    let result = await CategoryAPI.CategoryList(paging.page-2, paging.size);
    paging.page = paging.page-1;
    dispatch(setStatePagingTable(paging));
    dispatch(setCategoryList(result.data));
    
  }
  async function getNextPage() {
    nextPage();
    
    let result = await CategoryAPI.CategoryList(paging.page, paging.size);
    paging.page = paging.page+1;
    dispatch(setStatePagingTable(paging));
    dispatch(setCategoryList(result.data));
    
  }

   function filterPage(arrayPages, totalPage) {
    return arrayPages.filter(page => page <= totalPage);
  }
  function getVisiblePages(page, totalPage) {
    if (totalPage < 7) {
      return filterPage([1, 2, 3, 4, 5, 6], totalPage);
    }
    else {
      if (page > 4 && page + 2 < totalPage) {
        return [1, page - 1, page, page + 1, totalPage];
      }
      else if (page > 4 && page + 2 >= totalPage) {
        return [1, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
      }
      else {
        return [1, 2, 3, 4, 5, totalPage];
      }
    }
  }

    const visiblePages = getVisiblePages(paging.page, 3);


   async function changePage(page) {
    console.log(page);
    let result = await CategoryAPI.CategoryList(page-1, paging.size);
    paging.page = page;
    gotoPage(page-1);
    await dispatch(setStatePagingTable(paging));
    await dispatch(setCategoryList(result.data));

    
    console.log(pageIndex);
  
    

  }


  return (
    <React.Fragment>
     
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th width={column.width}
                  {...column.getHeaderProps()}
                  style={{
                    border: 'solid 1px #ebebeb',
                    paddingTop: '10px',
                    paddingBottom: '10px', 
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {column.render('Header')}
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
                  return (
                    <td width={cell.column.width}
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px #ebebeb',
                        background: 'papayawhip',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* pagination */}
      <div id="table-pagination">
        <div className="pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination btn-group">
              <li className="page-item">
                <button className="btn btn-light"
                 onClick={getPrePage}
                  disabled={!canPreviousPage} >Previous</button>
              </li>
              {visiblePages.map((page, index, array) =>
                <li key={page} className="page-item">
                  <button
                    // className="btn btn-light"
                   className={pageIndex + 1 === page ? "btn btn-primary" : "btn btn-light btn-page"}
                    onClick={() => { changePage(page) }}>
                    {array[index - 1] + 1 < page ? `...${page}` : page}
                  </button>
                </li>
              )}
              <li className="page-item">
                <button className="btn btn-light"
                 onClick={getNextPage}
                  disabled={!canNextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
     
    </React.Fragment>
  )

})
export default Tables;