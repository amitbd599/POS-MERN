import React from "react";
import { Link } from "react-router-dom";

const AllOrders = () => {
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
                      <th scope='col'>View</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1524584e4e58474</td>
                      <td>Alex johan</td>
                      <td>Amit Biswas</td>
                      <td>
                        <span className='bg-success-focus text-success-main px-16 py-4 rounded-pill fw-medium text-sm'>
                          Paid
                        </span>
                      </td>
                      <td>5000</td>
                      <td>
                        {" "}
                        <Link
                          to={"/view-order/12"}
                          className='btn btn-primary-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                        >
                          View order
                        </Link>
                      </td>
                      <td className='d-flex align-items-center gap-2'>
                        <button className='btn btn-warning-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'>
                          Return
                          <i className='ri-reply-line'></i>
                        </button>
                        <button className='btn btn-danger-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'>
                          Cancel
                          <i className='ri-close-large-line'></i>
                        </button>
                        <button
                          data-bs-toggle='modal'
                          data-bs-target='#exampleModal'
                          className='btn btn-success-600 radius-8 px-16 py-6 d-flex align-items-center gap-1'
                        >
                          Complete with payment
                          <i className='ri-check-double-fill'></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className='py-20'>
          <ul className='pagination d-flex flex-wrap align-items-center gap-2 justify-content-center mt-24'>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                href='/pagination'
              >
                Previous
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px w-48-px'
                href='/pagination'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='iconify iconify--ep text-xl'
                  width='1em'
                  height='1em'
                  viewBox='0 0 1024 1024'
                >
                  <path
                    fill='currentColor'
                    d='M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z'
                  />
                </svg>
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px w-48-px'
                href='/pagination'
              >
                1
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px w-48-px bg-primary-600 text-white'
                href='/pagination'
              >
                2
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px w-48-px'
                href='/pagination'
              >
                3
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px w-48-px'
                href='/pagination'
              >
                {" "}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='iconify iconify--ep text-xl'
                  width='1em'
                  height='1em'
                  viewBox='0 0 1024 1024'
                >
                  <path
                    fill='currentColor'
                    d='M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0a30.59 30.59 0 0 1 0-42.752L764.736 512L452.864 192a30.59 30.59 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0a30.59 30.59 0 0 1 0-42.752L508.736 512L196.864 192a30.59 30.59 0 0 1 0-42.688'
                  />
                </svg>
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                href='/pagination'
              >
                Next
              </a>
            </li>
          </ul>
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
                      <p className='form-label'>
                        Order Id: #1050540540654061560
                      </p>
                      <p className='form-label'>Customer name: Alex johan</p>
                      <p className='form-label'>Product price: 1200</p>
                      <p className='form-label'>Order created at: 22/12/2024</p>
                      <p className='form-label'>
                        Order created by: Amit Biswas
                      </p>
                    </div>

                    <div className='col-12'>
                      <label className='form-label'>
                        Choose payment method
                      </label>
                      <select
                        className='form-select'
                        aria-label='Default select example'
                      >
                        <option>Open this select menu</option>
                        <option value={1}>Cash</option>
                        <option value={2}>Bank</option>
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
