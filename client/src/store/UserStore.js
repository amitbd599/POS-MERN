import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
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

  // is login
  login: false,
  isLogin: async () => {
    try {
      let res = await axios.get(apiUrl + "/verify-user", {
        withCredentials: true,
      });

      if (res.data.status === true) {
        set({ login: true });
        return true;
      }
    } catch (e) {
      if (e.response.status === 401) {
        set({ login: false });
        return false;
      }
    }
  },

  // logout
  logout: async () => {
    try {
      let res = await axios.get(apiUrl + "/logout-user", {
        withCredentials: true,
        credentials: "include",
      });
      if (res.data.status === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  // login-user api
  loginUserRequest: async (reqBody) => {
    try {
      let res = await axios.post(baseURL + "/login-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        SuccessToast(res?.data?.message);
        return true;
      } else {
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      ErrorToast("Something went wrong!");
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
