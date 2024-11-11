import React from "react";

const CreateCategories = () => {
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
              <input type='text' className='form-control' />
            </div>
            <div className='col-12'>
              <label className='form-label'>Category Description</label>
              <input type='text' className='form-control' />
            </div>
            <div className='col-12'>
              <button
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
