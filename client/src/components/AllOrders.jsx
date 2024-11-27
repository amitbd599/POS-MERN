import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrderStore from "../store/OrderStore";
import { OrderActionAlert } from "../helper/helper";
import ReactPaginate from "react-paginate";
import PaymentStore from "../store/PaymentStore";

const AllOrders = () => {
  let {
    allOrderRequest,
    allOrder,
    cancelOrderByIdRequest,
    returnOrderByIdRequest,
  } = OrderStore();
  let { paymentCreateRequest } = PaymentStore();

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await allOrderRequest(10, 1);
    })();
  }, [allOrderRequest]);

  const TotalData = allOrder?.totalCount;

  //! handelPageClick
  const handelPageClick = (event) => {
    let pageNo = event.selected;
    allOrderRequest(10, pageNo + 1);
    navigate(`/all-order/${pageNo + 1}`);
  };

  //! handelCancelOrder
  const handelCancelOrder = (id) => {
    let reqBody = { orderId: id };
    OrderActionAlert(
      cancelOrderByIdRequest,
      reqBody,
      "Are you sure want to cancel?"
    ).then((res) => {
      if (res) {
        allOrderRequest(10, params.pageNo);
      }
    });
  };

  //! handelReturnOrder
  const handelReturnOrder = (id) => {
    let reqBody = { orderId: id };
    OrderActionAlert(
      returnOrderByIdRequest,
      reqBody,
      "Are you sure want to return?"
    ).then((res) => {
      if (res) {
        allOrderRequest(10, params.pageNo);
      }
    });
  };

  //! handelPaymentOrder
  let [paymentMethod, setPaymentMethod] = useState("Cash");
  let [orderInfo, setOrderInfo] = useState({});
  const handleMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handelPaymentOrder = (id) => {
    let reqBody = {
      orderId: id,
      customerId: orderInfo?.customerId,
      paymentMethod: paymentMethod,
    };
    console.log(reqBody);

    OrderActionAlert(
      paymentCreateRequest,
      reqBody,
      "Are you complete this order?"
    ).then((res) => {
      if (res) {
        allOrderRequest(10, params.pageNo);
      }
    });
  };

  console.log(orderInfo);

  return (
    <div>
      <div className='card'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Tables Border Colors</h5>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table bordered-table mb-0'>
                  <thead>
                    <tr>
                      <th scope='col'>Order ID</th>
                      <th scope='col'>Customer name</th>
                      <th scope='col'>Order created by</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Amount</th>

                      <th scope='col ' className='text-center'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrder?.order?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?._id}</td>
                        <td>{item?.customer?.[0]?.name}</td>
                        <td>{item?.user?.[0]?.name}</td>
                        <td>
                          <span
                            className={`px-16 py-4 rounded-pill fw-medium text-sm ${
                              item?.status === "Pending"
                                ? "text-warning-600 bg-warning-100"
                                : item?.status === "Completed"
                                ? "bg-success-focus text-success-main"
                                : item?.status === "Cancelled"
                                ? "text-neutral-800 bg-neutral-300"
                                : item?.status === "Returned"
                                ? "text-danger-600 bg-danger-100"
                                : ""
                            }`}
                          >
                            {item?.status}
                          </span>
                        </td>
                        <td>{item?.totalAmount}</td>

                        <td className='d-flex align-items-end justify-content-end gap-2'>
                          <Link
                            to={`/view-order/${item?._id}`}
                            className='btn btn-primary-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                          >
                            View order
                          </Link>
                          {item?.status === "Completed" && (
                            <button
                              className='btn btn-warning-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                              onClick={() => handelReturnOrder(item?._id)}
                            >
                              Return
                              <i className='ri-reply-line'></i>
                            </button>
                          )}

                          {item?.status === "Pending" && (
                            <button
                              className='btn btn-danger-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                              onClick={() => handelCancelOrder(item?._id)}
                            >
                              Cancel
                              <i className='ri-close-large-line'></i>
                            </button>
                          )}

                          {item?.status === "Pending" && (
                            <button
                              onClick={() => setOrderInfo(item)}
                              data-bs-toggle='modal'
                              data-bs-target='#exampleModal'
                              className='btn btn-success-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                            >
                              Complete with payment
                              <i className='ri-check-double-fill'></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className='p-20'>
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

      {/* Modal */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Order complete input
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <div className='card'>
                <div className='card-header'>
                  <h6 className='card-title mb-0'>Payment clear inputs</h6>
                </div>
                <div className='card-body'>
                  <div className='row gy-3'>
                    <div className='col-12'>
                      <p className='form-label'>Order Id: {orderInfo?._id}</p>
                      <p className='form-label'>
                        Customer name: {orderInfo?.customer?.[0]?.name}
                      </p>
                      <p className='form-label'>
                        Total price: {orderInfo?.totalAmount}
                      </p>
                      <p className='form-label'>
                        Order created by: {orderInfo?.user?.[0]?.name}
                      </p>
                    </div>

                    <div className='col-12'>
                      <label className='form-label'>
                        Choose payment method
                      </label>
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        value={paymentMethod || ""}
                        onChange={handleMethodChange}
                      >
                        <option value={"Cash"}>Cash</option>
                        <option value={"Bank"}>Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger-600 radius-8 px-16 py-6'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                data-bs-dismiss='modal'
                onClick={() => handelPaymentOrder(orderInfo?._id)}
                type='button'
                className='btn btn-success-600 radius-8 px-16 py-6'
              >
                Order paid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
