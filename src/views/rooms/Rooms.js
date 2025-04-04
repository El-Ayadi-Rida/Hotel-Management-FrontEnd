/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useDispatch, useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ButtonsAddNew from '../sharedCompoments/ButtonsAddNew';
import ControlsPageSize from '../sharedCompoments/ControlsPageSize';
import ControlsAdd from '../sharedCompoments/ControlsAdd';
import ControlsSearch from '../sharedCompoments/ControlsSearch';
import ModalAddEdit from './components/ModalAddEdit';
import Table from '../sharedCompoments/Table';
import TablePagination from '../sharedCompoments/TablePagination';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { getRooms, setSelectedRoom } from './RoomSlice';


const Rooms = () => {
  const dispatch = useDispatch();
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState(false);

  const title = 'Rooms';
  const description = 'Manage Rooms edit, delete and add.';
  const breadcrumbs = [
    { to: '/admin/dashboard', text: 'Dashboard' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Hotel Id',
        accessor: 'hotelId',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Room Number',
        accessor: 'roomNumber',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Type',
        accessor: 'type',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Price',
        accessor: 'price',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
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
                    dispatch(setSelectedRoom(original));
                    setIsOpenDeleteConfirmModal(true);
                  }}              
              >
                <CsLineIcons icon="bin" />
              </Button>{' '}
              <Button variant="outline-warning" size="sm" className="btn-icon btn-icon-only mb-1"
                  onClick={() => {
                    dispatch(setSelectedRoom(original));
                    setIsOpenAddEditModal(true);
                  }}              
              >
                <CsLineIcons icon="edit" />
              </Button>
          </div>
          );
        },
      },
    ];
  }, []);


  const { rooms: data, status, error , addEditStatus } = useSelector((state) => state.room);


  const tableInstance = useTable(
    {
      columns,
      data,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      isOpenDeleteConfirmModal,
      setIsOpenDeleteConfirmModal,
      entity: 'room',
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );


  useEffect(() => {
    dispatch(getRooms());
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
              <Col xs="12" md="5" className="d-flex align-items-start justify-content-end">
                <ButtonsAddNew tableInstance={tableInstance} />
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
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} />
                </div>
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
          {isOpenAddEditModal && <ModalAddEdit tableInstance={tableInstance} />}
          {isOpenDeleteConfirmModal && <DeleteConfirmModal tableInstance={tableInstance} />}
        </Col>
      </Row>
    </>
  );
};

export default Rooms;