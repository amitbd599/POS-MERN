import axios from "axios";
import create from "zustand";
import { setEmail, unAuthorize } from "../helper/helper";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL;

const UserStore = create((set) => ({
  isSubmit: false,

  // Register-user api
  RegisterUserRequest: async (reqBody) => {
    set({ isSubmit: true });
    let res = await axios.post(apiUrl + "/register-user", reqBody, {
      withCredentials: true,
    });
    if (res.data.status === true) {
      set({ isSubmit: false });
      return true;
    } else {
      set({ isSubmit: false });
      return false;
    }
  },

  // forgot-password-user api
  ForgotPasswordUserRequest: async (email) => {
    set({ isSubmit: true });
    let res = await axios.post(
      apiUrl + "/forgot-password-user/" + email,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.data.status === true) {
      set({ isSubmit: false });
      return true;
    } else {
      set({ isSubmit: false });
      return false;
    }
  },

  // otp-verify-user api
  OTPVerifyUserRequest: async (email, code) => {
    set({ isSubmit: true });
    let res = await axios.post(
      apiUrl + "/otp-verify-user/" + email + "/" + code,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.data.status === true) {
      set({ isSubmit: false });
      return true;
    } else {
      set({ isSubmit: false });
      return false;
    }
  },

  // otp-verify-user api
  ResetPasswordRequest: async (email, code, password) => {
    set({ isSubmit: true });
    let res = await axios.post(
      apiUrl + "/reset-password-user/" + email + "/" + code,
      { password },
      {
        withCredentials: true,
      }
    );
    if (res.data.status === true) {
      set({ isSubmit: false });
      return true;
    } else {
      set({ isSubmit: false });
      return false;
    }
  },

  // is login
  login: false,
  isLogin: async () => {
    try {
      let res = await axios.get(
        apiUrl + "/verify-user",
        {
          withCredentials: true,
        }
      );

      if (res.data.status === true) {
        set({ login: true })
        return true
      }
    } catch (e) {
      if (e.response.status === 401) {
        set({ login: false })
        return false
      }
    }


  },

  // logout
  logout: async () => {
    try {
      let res = await axios.get(apiUrl + "/logout-user", {
        withCredentials: true, credentials: "include"
      });
      if (res.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  // login-user api
  loginUserRequest: async (reqBody) => {
    let res = await axios.post(apiUrl + "/login-user", reqBody, {
      withCredentials: true,
    });
    if (res.data.status === true) {
      setEmail(reqBody.email);
      return true;
    } else {
      return false;
    }
  },

  // profile details
  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(apiUrl + "/profile-read-user", {
        withCredentials: true,
      });
      if (res.data.status === true) {
        set({ ProfileDetails: res.data.data[0] });
      }
    } catch (e) {
      unAuthorize(e.response.status);
    }
  },

  // update profile details
  ProfileUpdateRequest: async (reqBody) => {
    try {
      let res = await axios.post(apiUrl + "/profile-update-user", reqBody, {
        withCredentials: true,
      });
      if (res.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      unAuthorize(e.response.status);
    }
  },
}));

export default UserStore;



