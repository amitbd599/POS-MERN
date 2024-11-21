import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
const apiUrl = process.env.REACT_APP_API_URL;

const UserStore = create((set) => ({
  isSubmit: false,
  loading: false,

  //! Register-user api
  RegisterUserRequest: async (reqBody) => {
    set({ isSubmit: true });
    let res = await axios.post(baseURL + "/register-profile", reqBody, {
      withCredentials: true,
    });
    if (res?.data?.success === true) {
      set({ isSubmit: false });
      SuccessToast(res?.data?.message);
      return true;
    } else {
      set({ isSubmit: false });
      ErrorToast(res?.data?.message);
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

  //! profile details -- done
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

  //! profile details by id -- done
  ProfileDetailsById: null,
  ProfileDetailsByIdRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.get(baseURL + "/read-profile-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ ProfileDetailsById: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
    }
  },

  //! update profile
  ProfileUpdate: async (reqBody) => {
    try {
      let res = await axios.post(baseURL + "/update-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
    }
  },
  //! update profile by id
  ProfileUpdateByIdRequest: async (reqBody, id) => {
    try {
      let res = await axios.post(
        baseURL + "/update-profile-by-id/" + id,
        reqBody,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (e) {
      set({ loading: false });
      ErrorToast("Something went wrong!");
    }
  },

  //! all profile details -- done
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
