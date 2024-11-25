import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";

const UserStore = create((set) => ({
  loading: false,

  //! Register-user api
  registerUserRequest: async (reqBody) => {
    try {
      set({ loading: true });
      let res = await axios.post(baseURL + "/register-profile", reqBody, {
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

  //! logout
  logoutRequest: async () => {
    try {
      let res = await axios.get(baseURL + "/logout-profile", {
        withCredentials: true,
        credentials: "include",
      });
      if (res?.data?.success === true) {
        SuccessToast(res?.data?.message);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
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
    }
  },

  //! profile details -- done
  profileDetails: null,
  profileDetailsRequest: async () => {
    try {
      // set({ loading: true });
      let res = await axios.get(baseURL + "/read-profile", {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        // set({ loading: false });
        set({ profileDetails: res?.data?.data });
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! profile details by id -- done
  profileDetailsById: null,
  ProfileDetailsByIdRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.get(baseURL + "/read-profile-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ profileDetailsById: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! update profile
  profileUpdate: async (reqBody) => {
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
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! update profile by id
  profileUpdateByIdRequest: async (reqBody, id) => {
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
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! all profile details -- done
  allProfileDetails: null,
  allProfileDetailsRequest: async (perPage, pageNo) => {
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
        set({ allProfileDetails: res?.data?.data });
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! delete profile
  deleteProfileRequest: async (id) => {
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
      unAuthorize(e.status);
    }
  },
}));

export default UserStore;
