import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserStore from "../store/UserStore";
import ReactPaginate from "react-paginate";
import { DeleteAlert, formatDate } from "../helper/helper";

const AllUsers = () => {
  let {
    allProfileDetailsRequest,
    allProfileDetails,
    deleteProfileRequest,
    ProfileDetailsByIdRequest,
    profileUpdateByIdRequest,
  } = UserStore();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  //! allProfileDetailsRequest
  useEffect(() => {
    (async () => {
      await allProfileDetailsRequest(10, 1);
    })();
  }, [allProfileDetailsRequest]);

  const TotalData = allProfileDetails?.totalCount;

  //! handelPageClick
  const handelPageClick = (event) => {
    let pageNo = event.selected;
    allProfileDetailsRequest(10, pageNo + 1);
    navigate(`/all-user/${pageNo + 1}`);
  };

  //! deleteProfile
  let deleteProfile = async (id) => {
    DeleteAlert(deleteProfileRequest, id).then(async (res) => {
      if (res) {
        await allProfileDetailsRequest(10, parseInt(params.pageNo));
      }
    });
  };

  //! viewUser
  const [apiRole, setApiRole] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState("");
  let viewUser = async (id) => {
    await ProfileDetailsByIdRequest(id).then((res) => {
      setUser(res);
      setTimeout(() => {
        const roleFromApi = res?.role;
        setApiRole(roleFromApi);
      }, 100);
    });
  };
  useEffect(() => {
    if (apiRole !== undefined) {
      setSelectedRole(apiRole);
    }
  }, [apiRole]);

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  //! updateRole
  const updateRole = async (objId) => {
    await profileUpdateByIdRequest({ role: selectedRole }, objId);
    await allProfileDetailsRequest(10, parseInt(params.pageNo));
  };

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between'>
        <div>
          <h5 className='card-title mb-0'>All Role Users</h5>
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
                <th scope='col'>Number</th>
                <th scope='col'>Join Date</th>
                <th scope='col'>Role</th>

                <th scope='col' className='text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allProfileDetails?.users.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src={`/api/v1/get-file/${item?.img}`}
                        alt='pos'
                        className='w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden object-fit'
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
                  <td>
                    <span className='text-md mb-0 fw-normal text-secondary-light'>
                      {item?.number}
                    </span>
                  </td>
                  <td>{formatDate(item?.createdAt)}</td>
                  <td>
                    <span
                      className={`badge text-sm fw-semibold  px-20 py-9 radius-4 text-white ${
                        item?.role === "admin"
                          ? "text-danger-600 bg-danger-100"
                          : item?.role === "employee"
                          ? "text-success-600 bg-success-100"
                          : item?.role === "editor"
                          ? "text-info-600 bg-info-100"
                          : ""
                      }`}
                    >
                      {item?.role.charAt(0).toUpperCase() + item?.role.slice(1)}
                    </span>
                  </td>

                  <td className='text-center'>
                    <div className='d-flex align-items-center gap-10 justify-content-center'>
                      <button
                        onClick={() => viewUser(item?._id)}
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModal'
                        type='button'
                        className='bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={16}
                          height={16}
                          fill='currentColor'
                          className='bi bi-pencil-square'
                          viewBox='0 0 16 16'
                        >
                          <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                          <path
                            fillRule='evenodd'
                            d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteProfile(item?._id)}
                        type='button'
                        className='remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-trash'
                          viewBox='0 0 16 16'
                        >
                          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                          <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
                        </svg>
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

      {/* Modal */}
      <div
        className='modal fade view__user'
        id='exampleModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                View user information
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
                <div className='card-body'>
                  <div className='row gy-3'>
                    <div className='col-12'>
                      <div className='inner__card'>
                        <div className='img__card'>
                          <img src={user?.img} className='img-fluid' alt='' />
                          <div className='text__inner'>
                            <p>
                              Name: <strong>{user?.name}</strong>{" "}
                            </p>
                            <p>
                              Email Id: <strong>{user?.email}</strong>{" "}
                            </p>
                            <p>
                              User role: <strong>{user?.role}</strong>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-12'>
                      <label className='form-label'>Update user role</label>

                      <select
                        className='form-select'
                        aria-label='Default select example'
                        value={selectedRole || "default"} // Prevents default issue
                        onChange={handleChange}
                      >
                        <option>Change role</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"editor"}>Editor</option>
                        <option value={"employee"}>Employee</option>
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
                onClick={() => updateRole(user?._id)}
                type='button'
                className='btn btn-success-600 radius-8 px-16 py-6'
                data-bs-dismiss='modal'
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
