import React from "react";
import { Link } from "react-router-dom";

const AllCustomers = () => {
  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Striped Rows</h5>
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
                <tr>
                  <td>Alex Johan</td>
                  <td>amitbd590@gmail.com</td>
                  <td>01814331350</td>
                  <td>Hathazari, Chittagong</td>
                  <td>15-02-2024</td>
                  <td>
                    <span className='d-flex gap-3'>
                      <button
                        type='button'
                        className='btn btn-success-600 radius-8 px-14 py-6'
                      >
                        <Link to='/update-customer/id'>Edit</Link>
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger-600 radius-8 px-14 py-6'
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
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
    </div>
  );
};

export default AllCustomers;
