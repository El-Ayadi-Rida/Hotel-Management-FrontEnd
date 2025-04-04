/* eslint-disable no-plusplus */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setSelectedBooking } from 'views/bookings/BookingsSlice';
import { setSelectedHotel } from 'views/hotels/HotelSlice';
import { setSelectedRoom } from 'views/rooms/RoomSlice';

const Table = ({ tableInstance, className = 'react-table boxed' }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { getTableProps, headerGroups, page, getTableBodyProps, prepareRow, setIsOpenAddEditModal , entity} = tableInstance;
  const setSelectedEntity = async(entityData) =>{
    switch (entity) {
      case 'booking':
        await dispatch(setSelectedBooking(entityData));
        break;
      case 'hotel':
        await dispatch(setSelectedHotel(entityData));
        setIsOpenAddEditModal(true);
        break;
      case 'room':
        await dispatch(setSelectedRoom(entityData));
        setIsOpenAddEditModal(true);
        break;
      case 'customer':
        console.log("CUSTOMER::: ",entityData);
        history.push(`/app/admin/customers/details/${entityData.id}`);
        break;
      default:
        console.error('Entity not exist !');
        break;
    }
  }

  return (
    <>
      <table className={className} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr key={`header${headerIndex}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <th
                    key={`th.${index}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classNames(column.headerClassName, {
                      sorting_desc: column.isSortedDesc,
                      sorting_asc: column.isSorted && !column.isSortedDesc,
                      sorting: column.sortable,
                    })}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <tr key={`tr.${i}`} {...row.getRowProps()} >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td.${cellIndex}`}
                    {...cell.getCellProps()}
                    onClick={() => {
                        setSelectedEntity(cell?.row?.original);
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
