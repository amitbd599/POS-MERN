import React from "react";

const UpdateProduct = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h6 className='card-title mb-0'>Product Update Inputs</h6>
      </div>
      <div className='card-body'>
        <div className='row gy-3'>
          <div className='col-md-6'>
            <label className='form-label'>Product Name</label>
            <input type='text' className='form-control' />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product Description</label>
            <input type='text' className='form-control' />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product price</label>
            <input type='text' className='form-control' />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product SKU</label>
            <input type='text' className='form-control' />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product category</label>
            <select className='form-select' aria-label='Default select example'>
              <option selected=''>Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Product Stock Quantity</label>
            <input type='text' className='form-control' />
          </div>
          <div className='col-12'>
            <button
              type='button'
              className='btn btn-primary-600 radius-8 px-20 py-11'
            >
              Create product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
