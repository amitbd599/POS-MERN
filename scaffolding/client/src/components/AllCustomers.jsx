import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerStore from "../store/CustomerStore";
import { DeleteAlert, formatDate } from "../helper/helper";
import ReactPaginate from "react-paginate";

const AllCustomers = () => {
  let { allCustomerRequest, allCustomer, deleteCustomerRequest } =
    CustomerStore();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await allCustomerRequest(10, 1);
    })();
  }, [allCustomerRequest]);

  const TotalData = allCustomer?.totalCount;

  //! handelPageClick
  const handelPageClick = (event) => {
    let pageNo = event.selected;
    allCustomerRequest(10, pageNo + 1);
    navigate(`/all-customer/${pageNo + 1}`);
  };

  //! deleteProfile
  let deleteProfile = async (id) => {
    DeleteAlert(deleteCustomerRequest, id).then(async (res) => {
      if (res) {
        await allCustomerRequest(10, parseInt(params.pageNo));
      }
    });
  };

  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>All Customers</h5>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table striped-table mb-0'>
              <thead>
                <tr>
                  <th scope='col'>Customer name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone </th>
                  <th scope='col'>Address Date </th>
                  <th scope='col'>Create date</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {allCustomer?.customer?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.number}</td>
                    <td>{item?.address}</td>
                    <td>{formatDate(item?.createdAt)}</td>
                    <td>
                      <span className='d-flex gap-3'>
                        <button
                          type='button'
                          className='btn btn-success-600 radius-8 px-14 py-6'
                        >
                          <Link to={`/update-customer/${item?._id}`}>Edit</Link>
                        </button>
                        <button
                          onClick={() => deleteProfile(item?._id)}
                          type='button'
                          className='btn btn-danger-600 radius-8 px-14 py-6'
                        >
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24'>
            <span>Showing 1 to 10 of {TotalData} entries</span>
            {TotalData > 10 ? (
              <div>
                <ReactPaginate
                  className='pagination d-flex flex-wrap align-items-center gap-2 justify-content-center'
                  previousLabel='<'
                  nextLabel='>'
                  pageClassName='page-item'
                  activeClassName='active'
                  pageLinkClassName=' page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md'
                  previousLinkClassName='page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md'
                  nextLinkClassName='text-secondary-light'
                  activeLinkClassName=' active-link'
                  breakLabel='...'
                  pageCount={TotalData / 10}
                  initialPage={params.pageNo - 1}
                  pageRangeDisplayed={3}
                  onPageChange={handelPageClick}
                  type='button'
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomers;
