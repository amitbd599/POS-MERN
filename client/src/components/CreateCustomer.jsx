import React, { useRef } from "react";
import CustomerStore from "../store/CustomerStore";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  let { customerCreateRequest } = CustomerStore();
  let { nameRef, emailRef, phoneRef, addressRef } = useRef();
  let navigate = useNavigate();

  const customerCreate = async () => {
    let name = nameRef.value;
    let email = emailRef.value;
    let address = addressRef.value;
    let number = phoneRef.value;

    if (
      IsEmpty(name) ||
      IsEmpty(email) ||
      IsEmpty(number) ||
      IsEmpty(address)
    ) {
      ErrorToast("Please fill your profile");
    } else {
      let result = await customerCreateRequest({
        name,
        email,
        number,
        address,
      });
      if (result) {
        navigate("/all-customer/1");
      }
    }
  };
  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <h6 className='card-title mb-0'>Customer Inputs</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            <div className='col-md-6'>
              <label className='form-label'>Customer Name</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (nameRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer email</label>
              <input
                type='email'
                className='form-control'
                ref={(input) => (emailRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer phone</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (phoneRef = input)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Customer Address</label>
              <input
                type='text'
                className='form-control'
                ref={(input) => (addressRef = input)}
              />
            </div>

            <div className='col-12'>
              <button
                onClick={customerCreate}
                type='button'
                className='btn btn-primary-600 radius-8 px-20 py-11'
              >
                Create customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCustomer;
