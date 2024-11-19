import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
const apiUrl = process.env.REACT_APP_API_URL;

const UserStore = create((set) => ({
  isSubmit: false,
  loading: false,

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

  //! login-user api -- done
  loginUserRequest: async (reqBody) => {
    try {
      set({ loading: true });
      let res = await axios.post(baseURL + "/login-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
      return false;
    }
  },

  //! profile details
  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
      set({ loading: true });
      let res = await axios.get(baseURL + "/read-profile", {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ ProfileDetails: res?.data?.data });
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
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

  //! all profile details
  AllProfileDetails: null,
  AllProfileDetailsRequest: async (perPage, pageNo) => {
    try {
      set({ loading: true });
      let res = await axios.get(
        baseURL + "/read-all-profile/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ AllProfileDetails: res?.data?.data });
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
    }
  },

  //! delete profile
  DeleteProfileRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.delete(baseURL + "/delete-profile/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
      return false;
    }
  },
}));

export default UserStore;
