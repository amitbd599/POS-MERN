import  { useState } from "react";
import { Link } from "react-router-dom";
import BackupStore from "../store/BackupStore";
import { backupURL } from "../helper/config";

const BackupDatabase = () => {
  let { importCreateRequest } = BackupStore();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);


    await importCreateRequest(formData);
  };
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='card h-100 p-0'>
          <div className='card-header border-bottom bg-base py-16 px-24'>
            <h6 className='text-lg fw-semibold mb-0'>Import Database</h6>
          </div>
          <div className='card-body p-24'>
            <input
              type='file'
              className='form-control w-auto mt-24 form-control-lg'
              id='basic-upload'
              accept='.json'
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              className='btn btn-primary-600 radius-8 px-20 py-11 mt-16'
            >
              Import JSON file
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='card h-100 p-0'>
          <div className='card-header border-bottom bg-base py-16 px-24'>
            <h6 className='text-lg fw-semibold mb-0'>Export Database</h6>
          </div>
          <div className='card-body p-24'>
            <Link
              to={backupURL}
              className='btn btn-primary-600 radius-8 px-20 py-11'
            >
              Create a database backup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupDatabase;
