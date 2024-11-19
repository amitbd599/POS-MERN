import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserStore from "../store/UserStore";
import ReactPaginate from "react-paginate";
import { DeleteAlert } from "../helper/helper";

const AllUsers = () => {
  let { AllProfileDetailsRequest, AllProfileDetails, DeleteProfileRequest } =
    UserStore();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    (async () => {
      await AllProfileDetailsRequest(10, 1);
    })();
  }, [AllProfileDetailsRequest]);

  const TotalData = AllProfileDetails?.totalCount;
  const handelPageClick = (event) => {
    let pageNo = event.selected;
    AllProfileDetailsRequest(10, pageNo + 1);
    navigate(`/all-user/${pageNo + 1}`);
  };

  let deleteProfile = async (id) => {
    DeleteAlert(DeleteProfileRequest, id).then(async (res) => {
      if (res) {
        await AllProfileDetailsRequest(10, 1);
      }
    });
  };

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between'>
        <div className='d-flex align-items-center flex-wrap gap-3'>
          <span className='text-md fw-medium text-secondary-light mb-0'>
            Show
          </span>

          <form className='navbar-search'>
            <input
              type='text'
              className='bg-base h-40-px w-auto'
              name='search'
              placeholder='Search'
            />
            <Icon icon='ion:search-outline' className='icon' />
          </form>
          <select
            className='form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px'
            defaultValue='Select Status'
          >
            <option value='Select Status' disabled>
              All users
            </option>
            <option value='Active'>Admin</option>
            <option value='Inactive'>Editor</option>
            <option value='Inactive'>Employee</option>
          </select>
        </div>
        <Link
          to='/add-user'
          className='btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2'
        >
          <Icon
            icon='ic:baseline-plus'
            className='icon text-xl line-height-1'
          />
          Add New User
        </Link>
      </div>
      <div className='card-body p-24'>
        <div className='table-responsive scroll-sm'>
          <table className='table bordered-table sm-table mb-0'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Join Date</th>
                <th scope='col'>Role</th>

                <th scope='col' className='text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {AllProfileDetails?.users.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src={item?.img}
                        alt='pos'
                        className='w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden'
                      />
                      <div className='flex-grow-1'>
                        <span className='text-md mb-0 fw-normal text-secondary-light'>
                          {item?.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className='text-md mb-0 fw-normal text-secondary-light'>
                      {item?.email}
                    </span>
                  </td>
                  <td>{item?.createdAt}</td>
                  <td>{item?.role}</td>

                  <td className='text-center'>
                    <div className='d-flex align-items-center gap-10 justify-content-center'>
                      <button
                        type='button'
                        className='bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle'
                      >
                        <Icon icon='lucide:edit' className='menu-icon' />
                      </button>
                      <button
                        onClick={() => deleteProfile(item?._id)}
                        type='button'
                        className='remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle'
                      >
                        <Icon
                          icon='fluent:delete-24-regular'
                          className='menu-icon'
                        />
                      </button>
                    </div>
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
  );
};

export default AllUsers;
