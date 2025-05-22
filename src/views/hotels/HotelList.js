/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import { Link } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useDispatch, useSelector } from 'react-redux';
import ControlsPageSize from '../sharedCompoments/ControlsPageSize';
import ControlsSearch from '../sharedCompoments/ControlsSearch';
import TablePagination from '../sharedCompoments/TablePagination';
import { getHotels } from './HotelSlice';

const HotelList = () => {
  const dispatch = useDispatch();

  const title = 'Hotels';
  const description = 'Manage Hotels edit, delete and add.';
  const breadcrumbs = [{ to: '/admin/dashboard', text: 'Dashboard' }];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: 'name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Location',
        accessor: 'location',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Rooms Count',
        accessor: 'roomCount',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
    ];
  }, []);

  const { hotels: data, status, error } = useSelector((state) => state.hotel);

  const tableInstance = useTable(
    {
      columns,
      data,
      // manualPagination: true,
      // manualFilters: true,
      // manualSortBy: true,
      // autoResetPage: false,
      // autoResetSortBy: false,
      // initialState: { pageIndex: 0, sortBy: [{ id: 'name', desc: false }], hiddenColumns: ['id'] },
      entity: 'hotel',
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  const { page, prepareRow } = tableInstance;

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
              <Row>
                {page.map((row, i) => {
                  const item = row.original;
                  return (
                    <Col key={i} xs="12" >
                    <Card className="h-100">
                      <Link to={`/rooms/${item.id}`}>
                        <Card.Img src="/img/product/small/room.jpg" className="card-img-top sh-22" alt="card image" />
                        <Card.Body>{item.name}</Card.Body>
                        <Card.Footer className="border-0 pt-0">tese</Card.Footer>
                      </Link>
                    </Card>
                    </Col>
                  );
                })}
                </Row>
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

export default HotelList;
