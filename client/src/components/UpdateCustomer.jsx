import React from "react";

const UpdateCustomer = () => {
  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <h6 className='card-title mb-0'>Update Customer Inputs</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            <div className='col-md-6'>
              <label className='form-label'>Customer Name</label>
              <input type='text' className='form-control' />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer email</label>
              <input type='email' className='form-control' />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer phone</label>
              <input type='text' className='form-control' />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer Address</label>
              <input type='text' className='form-control' />
            </div>

            <div className='col-12'>
              <button
                type='button'
                className='btn btn-primary-600 radius-8 px-20 py-11'
              >
                Update customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomer;
