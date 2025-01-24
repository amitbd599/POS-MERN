import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import UserStore from "../store/UserStore";
import FileStore from "../store/FileStore";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  let [rowFile, setRowFile] = useState(null);
  let { registerUserRequest } = UserStore();
  let { uploadFileRequest } = FileStore();
  let navigate = useNavigate();

  let { nameRef, emailRef, phoneRef, passwordRef } = useRef();
  const [imagePreview, setImagePreview] = useState(
    "/assets/img/user-grid-img13.png"
  );

  //! Image upload
  const readURL = (input) => {
    const file = input.target.files && input.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        // 100 KB limit
        ErrorToast("File size must be less than 100 KB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setRowFile(file);
    }
  };

  let fileUploadFun = async () => {
    if (!rowFile) {
      ErrorToast("Please select a image file");
      return;
    }
    const formData = new FormData();
    formData.append("file", rowFile);
    const result = await uploadFileRequest(formData);
    // setFile(result?.data?.file?.[0]?.filename);
    return { status: true, file: result?.data?.file?.[0]?.filename };
  };

  const [selectedRole, setSelectedRole] = useState("");
  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  //! create User Profile
  const createUserProfile = async () => {
    let name = nameRef.value;
    let email = emailRef.value;
    let password = passwordRef.value;
    let number = phoneRef.value;
    let role = selectedRole;

    if (
      IsEmpty(name) ||
      IsEmpty(email) ||
      IsEmpty(number) ||
      IsEmpty(password) ||
      IsEmpty(role)
    ) {
      ErrorToast("Please fill your profile");
    } else {
      let fileUploadResult = await fileUploadFun();
      if (fileUploadResult?.status === true) {
        let result = await registerUserRequest({
          name,
          email,
          number,
          password,
          img: fileUploadResult.file,
          role,
        });
        if (result) {
          navigate("/all-user/1");
        }
      }
    }
  };

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-body p-24'>
        <div className='row justify-content-center'>
          <div className='col-xxl-6 col-xl-8 col-lg-10'>
            <div className='card border'>
              <div className='card-body'>
                <h6 className='text-md text-primary-light mb-16'>
                  Profile Image
                </h6>
                {/* Upload Image Start */}
                <div className='mb-24 mt-16'>
                  <div className='avatar-upload'>
                    <div className='avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer'>
                      <input
                        type='file'
                        id='imageUpload'
                        accept='.png, .jpg, .jpeg'
                        hidden
                        onChange={readURL}
                      />
                      <label
                        htmlFor='imageUpload'
                        className='w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={16}
                          height={16}
                          fill='currentColor'
                          className='bi bi-camera'
                          viewBox='0 0 16 16'
                        >
                          <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z' />
                          <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0' />
                        </svg>
                      </label>
                    </div>
                    <div className='avatar-preview'>
                      <div
                        id='imagePreview'
                        style={{
                          backgroundImage: `url(${imagePreview})`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Upload Image End */}
                <div>
                  <div className='mb-20'>
                    <label
                      htmlFor='name'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Full Name <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control radius-8'
                      id='name'
                      placeholder='Enter Full Name'
                      ref={(input) => (nameRef = input)}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='email'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Email <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='email'
                      className='form-control radius-8'
                      id='email'
                      placeholder='Enter email address'
                      ref={(input) => (emailRef = input)}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='number'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Number <span className='text-danger-600'>*</span>{" "}
                    </label>
                    <input
                      type='text'
                      className='form-control radius-8'
                      id='number'
                      placeholder='Enter password'
                      ref={(input) => (phoneRef = input)}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='password'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Password <span className='text-danger-600'>*</span>{" "}
                    </label>
                    <input
                      type='password'
                      className='form-control radius-8'
                      id='password'
                      placeholder='Enter password'
                      ref={(input) => (passwordRef = input)}
                    />
                  </div>
                  <div className='mb-20'>
                    <label
                      htmlFor='role'
                      className='form-label fw-semibold text-primary-light text-sm mb-8'
                    >
                      Role
                      <span className='text-danger-600'>*</span>{" "}
                    </label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      value={selectedRole || ""}
                      onChange={handleChange}
                    >
                      <option>Select role</option>
                      <option value={"admin"}>Admin</option>
                      <option value={"editor"}>Editor</option>
                      <option value={"employee"}>Employee</option>
                    </select>
                  </div>

                  <div>
                    <button
                      onClick={createUserProfile}
                      type='submit'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      Create a user
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
