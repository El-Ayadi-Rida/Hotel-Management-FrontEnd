/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useDispatch, useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ControlsPageSize from '../sharedCompoments/ControlsPageSize';
import ControlsSearch from '../sharedCompoments/ControlsSearch';
import Table from '../sharedCompoments/Table';
import TablePagination from '../sharedCompoments/TablePagination';
import { getCustomers } from './CustomerSlice';

const Hotels = () => {
  const dispatch = useDispatch();
  const title = 'Customers';
  const description = 'Manage Customers Bookings.';
  const breadcrumbs = [
    { to: '/admin/dashboard', text: 'Dashboard' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Username',
        accessor: 'username',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
      },
      {
        Header: 'Bookings',
        accessor: 'bookingCount',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
      },
    ];
  }, []);


  const { customers: data, status, error } = useSelector((state) => state.customer);


  const tableInstance = useTable(
    {
      columns,
      data,
    //   manualPagination: true,
    //   manualFilters: true,
    //   manualSortBy: true,
    //   autoResetPage: false,
    //   autoResetSortBy: false,
    //   initialState: { pageIndex: 0 },
      entity: 'customer',
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );


  useEffect(() => {
    dispatch(getCustomers());
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
        </Col>
      </Row>
    </>
  );
};

export default Hotels;
