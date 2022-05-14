import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { MoreVertical, Edit } from "react-feather";
import moment from "moment";

const ServiceRequestList = (props) => {
  const _data = props.data;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(props?.pagination?.per_page);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(_data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(_data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % _data.length;
    setItemOffset(newOffset);
  };

  return (
    <React.Fragment>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>SERVICE NAME</th>
            <th>STATUS</th>
            <th>CREATED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((request) => {
              return (
                <tr key={request.id}>
                  <td>
                    <Link to={``}>
                      <span className="align-middle fw-bold">
                        {request?.service_name}
                      </span>
                    </Link>
                  </td>
                  <td className='text-left'>
                  <span className="align-middle fw-bold">
                        {request.status}
                      </span>
                  </td>
                  <td>{moment(request.created_at).format('YYYY-MM-DD')}</td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <Link
                          className="dropdown-item"
                          to={``}
                        >
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Detail</span>
                        </Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end pt-1">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </React.Fragment>
  );
};

export default ServiceRequestList;
