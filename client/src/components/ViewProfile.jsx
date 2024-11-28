import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { ErrorToast, formatDate, IsEmpty } from "../helper/helper";
import UserStore from "../store/UserStore";
const ViewProfile = () => {
  let { nameRef, phoneRef, passwordRef } = useRef();
  let { profileDetailsRequest, profileDetails, profileUpdate } = UserStore();
  const [imagePreview, setImagePreview] = useState(
    "/assets/img/user-grid-img13.png"
  );
  useEffect(() => {
    (() => {
      profileDetailsRequest();
      setImagePreview(profileDetails?.img);
    })();
  }, [profileDetails?.img, profileDetailsRequest]);

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

  //! update User Profile
  const updateUserProfile = async () => {
    let name = nameRef.value;
    let number = phoneRef.value;
    let password = passwordRef.value;
    let img = imagePreview;

    if (IsEmpty(name) || IsEmpty(number) || IsEmpty(password)) {
      ErrorToast("Please fill your profile");
    } else {
      let result = await profileUpdate({ name, number, password, img });
      if (result) {
        profileDetailsRequest();
      }
    }
  };

  return (
    <div className='row gy-4'>
      <div className='col-lg-4'>
        <div className='user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100'>
          <img
            src='/assets/img/user-grid-bg1.png'
            alt=''
            className='w-100 object-fit-cover'
          />
          <div className='pb-24 ms-16 mb-24 me-16  mt--100'>
            <div className='text-center border border-top-0 border-start-0 border-end-0'>
              <div>
                <img
                  src={profileDetails?.img}
                  alt=''
                  className='border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover'
                />
              </div>
              <h6 className='mb-0 mt-16'>{profileDetails?.name}</h6>
              <span className='text-secondary-light mb-16'>
                {profileDetails?.email}
              </span>
            </div>
            <div className='mt-24'>
              <h6 className='text-xl mb-16'>Personal Info</h6>
              <ul>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    Full Name
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {profileDetails?.name}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Email
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {profileDetails?.email}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Number
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {profileDetails?.number}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    User role
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {profileDetails?.role}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Join date
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {formatDate(profileDetails?.createdAt)}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Last update
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {formatDate(profileDetails?.updatedAt)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-8'>
        <div className='card h-100'>
          <div className='card-body p-24'>
            <div className='tab-content' id='pills-tabContent'>
              <div className='pt-40'>
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
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Upload Image End */}
                <div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='name'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Full Name
                          <span className='text-danger-600'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control radius-8'
                          id='name'
                          placeholder='Enter Full Name'
                          defaultValue={profileDetails?.name}
                          ref={(input) => (nameRef = input)}
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
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
                          defaultValue={profileDetails?.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='number'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Phone
                        </label>
                        <input
                          type='email'
                          className='form-control radius-8'
                          id='number'
                          placeholder='Enter phone number'
                          defaultValue={profileDetails?.number}
                          ref={(input) => (phoneRef = input)}
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='password'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Password
                        </label>
                        <input
                          type='password'
                          className='form-control radius-8'
                          id='password'
                          placeholder='Enter password'
                          ref={(input) => (passwordRef = input)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='pt-2'>
                    <button
                      onClick={updateUserProfile}
                      type='button'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      Update profile
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

export default ViewProfile;
