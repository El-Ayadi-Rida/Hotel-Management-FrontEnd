/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import HtmlHead from 'components/html-head/HtmlHead';
import { format } from 'date-fns';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useDispatch, useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ControlsPageSize from '../sharedCompoments/ControlsPageSize';
import ControlsSearch from '../sharedCompoments/ControlsSearch';
import Table from '../sharedCompoments/Table';
import TablePagination from '../sharedCompoments/TablePagination';
import { getBookings, setSelectedBooking } from './BookingsSlice';
import CancelModal from './components/CancelModal';
import ConfirmModal from './components/ConfirmModal';


const Bookings = () => {
  const dispatch = useDispatch();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const title = 'Bookings';
  const description = 'Manage Bookings edit, cancel and get.';
  const breadcrumbs = [
    { to: '/admin/dashboard', text: 'Dashboard' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Booking Id',
        accessor: 'id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Check In Date',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ row }) => {
          const { checkInDate } = row.original;
          return (<>{ format(new Date(checkInDate) , 'dd-mm-yyyy')}</>)
        }

      },
      {
        Header: 'Check Out Date',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ row }) => {
          const { checkOutDate } = row.original;
          return (<>{ format(new Date(checkOutDate) , 'dd-mm-yyyy')}</>)
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-20',
        Cell: ({ row }) => {
          const { original } = row;
          return (
          <div>
              <Button variant="outline-danger" size="sm" className="btn-icon btn-icon-only mb-1"
                  onClick={() => {
                    dispatch(setSelectedBooking(original));
                    setIsOpenCancelModal(true);                    
                  }}              
              >
                <CsLineIcons icon="close" />
              </Button>{' '}
              <Button variant="outline-primary" size="sm" className="btn-icon btn-icon-only mb-1"
                  onClick={() => {
                    dispatch(setSelectedBooking(original));
                    setIsOpenConfirmModal(true);
                  }}              
              >
                <CsLineIcons icon="check" />
              </Button>
          </div>
          );
        },
      },
    ];
  }, []);


  const { bookings: data, status, error , addEditStatus } = useSelector((state) => state.booking);

  const tableInstance = useTable(
    {
      columns,
      data,
      isOpenConfirmModal,
      setIsOpenConfirmModal,
      isOpenCancelModal,
      setIsOpenCancelModal,
    //   manualPagination: true,
    //   manualFilters: true,
    //   manualSortBy: true,
    //   autoResetPage: false,
    //   autoResetSortBy: false,
    //   initialState: { pageIndex: 0, sortBy: [{ id: 'name', desc: false }], hiddenColumns: [] },
      entity: 'booking',
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );


  useEffect(() => {
    dispatch(getBookings());
  }, []);
  

  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>
        <Col>
          <div className="page-title-container">
            <Row>
              <Col xs="12" md="7">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
            </Row>
          </div>

          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          {isOpenCancelModal && <CancelModal tableInstance={tableInstance} />}
          {isOpenConfirmModal && <ConfirmModal tableInstance={tableInstance} />}
        </Col>
      </Row>
    </>
  );
};

export default Bookings;