import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const BackupDatabase = () => {
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='card h-100 p-0'>
          <div className='card-header border-bottom bg-base py-16 px-24'>
            <h6 className='text-lg fw-semibold mb-0'>Import Database</h6>
          </div>
          <div className='card-body p-24'>
            <label
              htmlFor='basic-upload'
              className='border border-primary-600 fw-medium text-primary-600 px-16 py-12 radius-12 d-inline-flex align-items-center gap-2 bg-hover-primary-50'
            >
              <Icon icon='solar:upload-linear' className='text-xl' />
              Click to upload
            </label>
            <input
              type='file'
              className='form-control w-auto mt-24 form-control-lg'
              id='basic-upload'
            />
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='card h-100 p-0'>
          <div className='card-header border-bottom bg-base py-16 px-24'>
            <h6 className='text-lg fw-semibold mb-0'>Export Database</h6>
          </div>
          <div className='card-body p-24'>
            <button
              type='button'
              className='btn btn-primary-600 radius-8 px-20 py-11'
            >
              Create a database backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupDatabase;
