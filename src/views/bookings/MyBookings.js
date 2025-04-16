/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useDispatch, useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ControlsPageSize from '../sharedCompoments/ControlsPageSize';
import ControlsSearch from '../sharedCompoments/ControlsSearch';
import Table from '../sharedCompoments/Table';
import TablePagination from '../sharedCompoments/TablePagination';
import { getBookingByCustomer, getBookings, setSelectedBooking } from './BookingsSlice';
import CancelModal from './components/CancelModal';
import ConfirmModal from './components/ConfirmModal';


const MyBookings = () => {
  const dispatch = useDispatch();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const title = 'MyBookings';
  const description = 'Manage MyBookings Page .';
  const breadcrumbs = [
    { to: '/customer/dashboard', text: 'Dashboard' },
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
        accessor: 'checkInDate',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
      },
      {
        Header: 'Check Out Date',
        accessor: 'checkOutDate',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Adults',
        accessor: 'config.adults',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'children',
        accessor: 'config.children',
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
                disabled={!(new Date(original.checkInDate) > new Date())}
                  onClick={() => {
                    dispatch(setSelectedBooking(original));
                    setIsOpenCancelModal(true);                    
                  }}              
              >
                <CsLineIcons icon="close" />
              </Button>{' '}
          </div>
          );
        },
      },
    ];
  }, []);


  const { customerBookings: data, status, error , addEditStatus } = useSelector((state) => state.booking);
  const { currentUser } = useSelector((state) => state.auth);


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
    dispatch(getBookingByCustomer(currentUser?.id));
  }, [dispatch]);
  

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
           {/* {isOpenConfirmModal && <ConfirmModal tableInstance={tableInstance} />} */}
        </Col>
      </Row>
    </>
  );
};

export default MyBookings;