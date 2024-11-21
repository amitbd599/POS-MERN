import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useState } from "react";
import UserStore from "../store/UserStore";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  let { registerUserRequest } = UserStore();
  let navigate = useNavigate();

  let { nameRef, emailRef, phoneRef, passwordRef } = useRef();
  const [imagePreview, setImagePreview] = useState(
    "assets/images/user-grid/user-grid-img13.png"
  );

  //! Image upload
  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };

  const [selectedRole, setSelectedRole] = useState("");
  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  //! update User Profile
  const createUserProfile = async () => {
    let name = nameRef.value;
    let email = emailRef.value;
    let password = passwordRef.value;
    let number = phoneRef.value;
    let img = imagePreview;
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
      let result = await registerUserRequest({
        name,
        email,
        number,
        password,
        img,
        role,
      });
      if (result) {
        navigate("/all-user/1");
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
                        <Icon
                          icon='solar:camera-outline'
                          className='icon'
                        ></Icon>
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
                      value={selectedRole || ""} // Prevents default issue
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
