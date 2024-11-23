import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryStore from "../store/CategoryStore";
import { DeleteAlert, formatDate } from "../helper/helper";

const AllCategories = () => {
  let { allCategoryRequest, allCategory, deleteCategoryRequest } =
    CategoryStore();

  useEffect(() => {
    (async () => {
      await allCategoryRequest();
    })();
  }, [allCategoryRequest]);

  //! deleteCategory
  let deleteCategory = async (id) => {
    DeleteAlert(deleteCategoryRequest, id).then(async (res) => {
      if (res) {
        await allCategoryRequest();
      }
    });
  };

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
                  {allCategory?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.description}</td>
                      <td>{formatDate(item?.createdAt)}</td>
                      <td className='d-flex gap-3'>
                        <button
                          type='button'
                          className='btn btn-success-600 radius-8 px-14 py-6'
                        >
                          <Link to={`/update-categories/${item?._id}`}>
                            Edit
                          </Link>
                        </button>
                        <button
                          onClick={() => deleteCategory(item?._id)}
                          type='button'
                          className='btn btn-danger-600 radius-8 px-14 py-6'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
