import React, { useRef } from "react";
import CategoryStore from "../store/CategoryStore";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../helper/helper";

const CreateCategories = () => {
  let { categoryCreateRequest } = CategoryStore();
  let { nameRef, descriptionRef } = useRef();
  let navigate = useNavigate();

  const customerCreate = async () => {
    let name = nameRef.value;
    let description = descriptionRef.value;

    if (IsEmpty(name) || IsEmpty(description)) {
      ErrorToast("Please fill your profile");
    } else {
      let result = await categoryCreateRequest({
        name,
        description,
      });
      if (result) {
        navigate("/all-categories/1");
      }
    }
  };
  return (
    <div className='col-md-12'>
      <div className='card'>
        <div className='card-header'>
          <h6 className='card-title mb-0'>Categories Inputs</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            <div className='col-12'>
              <label className='form-label'>Category Name</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (nameRef = input)}
              />
            </div>
            <div className='col-12'>
              <label className='form-label'>Category Description</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (descriptionRef = input)}
              />
            </div>
            <div className='col-12'>
              <button
                onClick={customerCreate}
                type='button'
                className='btn btn-primary-600 radius-8 px-20 py-11'
              >
                Create category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategories;
