import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../helper/helper";
import CategoryStore from "../store/CategoryStore";

const UpdateCategories = () => {
  let { id } = useParams();
  let { categoryUpdateByIdRequest, categoryDetailsByIdRequest } =
    CategoryStore();
  useEffect(() => {
    (async () => {
      await categoryDetailsByIdRequest(id).then((res) => {
        setCategoryData(res);
      });
    })();
  }, [categoryDetailsByIdRequest, id]);

  let { nameRef, descriptionRef } = useRef();
  let navigate = useNavigate();
  let [categoryData, setCategoryData] = useState({});

  const categoryUpdate = async () => {
    let name = nameRef.value;
    let description = descriptionRef.value;

    if (IsEmpty(name) || IsEmpty(description)) {
      ErrorToast("Please fill all information.");
    } else {
      let result = await categoryUpdateByIdRequest(
        {
          name,
          description,
        },
        id
      );
      if (result) {
        navigate("/all-categories/1");
      }
    }
  };
  return (
    <div className='col-md-12'>
      <div className='card'>
        <div className='card-header'>
          <h6 className='card-title mb-0'>Update Categories Inputs</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            <div className='col-12'>
              <label className='form-label'>Category Name</label>
              <input
                type='text'
                className='form-control'
                defaultValue={categoryData?.name}
                ref={(input) => (nameRef = input)}
              />
            </div>
            <div className='col-12'>
              <label className='form-label'>Category Description</label>
              <input
                type='text'
                className='form-control'
                defaultValue={categoryData?.description}
                ref={(input) => (descriptionRef = input)}
              />
            </div>
            <div className='col-12'>
              <button
                onClick={categoryUpdate}
                type='button'
                className='btn btn-primary-600 radius-8 px-20 py-11'
              >
                Update category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategories;
