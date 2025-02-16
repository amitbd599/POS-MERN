import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserStore from "../store/UserStore";

const Login = () => {
  const navigate = useNavigate();
  let { loginUserRequest } = UserStore();
  let location = useLocation();
  let { emailRef, passwordRef } = useRef();

  let from = location.state?.from?.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = emailRef.value;
    let password = passwordRef.value;
    await loginUserRequest({ email, password }).then((res) => {
      if (res) {
        navigate(from, { replace: true });
      }
    });
  };
  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='/assets/img/auth-img.png' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='/assets/img/logo.png' alt='' />
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          <form action='#'>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                ref={(input) => (emailRef = input)}
                type='email'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
              />
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  ref={(input) => (passwordRef = input)}
                  type='password'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                />
              </div>
              <span
                className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                data-toggle='#your-password'
              />
            </div>

            <button
              onClick={handleSubmit}
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {" "}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
