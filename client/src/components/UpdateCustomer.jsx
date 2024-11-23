import React, { useEffect, useRef, useState } from "react";
import CustomerStore from "../store/CustomerStore";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../helper/helper";

const UpdateCustomer = () => {
  let { id } = useParams();
  let { customerUpdateByIdRequest, customerDetailsByIdRequest } =
    CustomerStore();
  useEffect(() => {
    (async () => {
      await customerDetailsByIdRequest(id).then((res) => {
        setProfileData(res);
      });
    })();
  }, []);

  let { nameRef, emailRef, numberRef, addressRef } = useRef();
  let navigate = useNavigate();
  let [profileData, setProfileData] = useState({});

  const customerUpdate = async () => {
    let name = nameRef.value;
    let email = emailRef.value;
    let address = addressRef.value;
    let number = numberRef.value;

    if (
      IsEmpty(name) ||
      IsEmpty(email) ||
      IsEmpty(number) ||
      IsEmpty(address)
    ) {
      ErrorToast("Please fill your profile");
    } else {
      let result = await customerUpdateByIdRequest(
        {
          name,
          email,
          number,
          address,
        },
        id
      );
      if (result) {
        navigate("/all-customer/1");
      }
    }
  };

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
              <input
                ref={(input) => (nameRef = input)}
                type='text'
                className='form-control'
                defaultValue={profileData?.name}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer email</label>
              <input
                ref={(input) => (emailRef = input)}
                type='email'
                className='form-control'
                defaultValue={profileData?.email}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer number</label>
              <input
                ref={(input) => (numberRef = input)}
                type='text'
                className='form-control'
                defaultValue={profileData?.number}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer Address</label>
              <input
                ref={(input) => (addressRef = input)}
                type='text'
                className='form-control'
                defaultValue={profileData?.address}
              />
            </div>

            <div className='col-12'>
              <button
                onClick={() => customerUpdate(profileData?._id)}
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
