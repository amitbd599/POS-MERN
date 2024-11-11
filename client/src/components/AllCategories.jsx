import React from "react";
import { Link } from "react-router-dom";

const AllCategories = () => {
  return (
    <div>
      <div className='col-12'>
        <div className='card h-100'>
          <div className='card-header'>
            <h5 className='card-title mb-0'>Default Table</h5>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table basic-table mb-0'>
                <thead>
                  <tr>
                    <th>S.L</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Create Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>
                      <a className='text-primary-600' href='/table-basic'>
                        #526534
                      </a>
                    </td>
                    <td>Kathryn Murphy</td>
                    <td>25 Jan 2024</td>
                    <td className='d-flex gap-3'>
                      <button
                        type='button'
                        className='btn btn-success-600 radius-8 px-14 py-6'
                      >
                        <Link to='/update-categories/id'>Edit</Link>
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger-600 radius-8 px-14 py-6'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
