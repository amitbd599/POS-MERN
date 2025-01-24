import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();

console.log(baseURL);

const UserStore = create((set) => ({
  //! Register-user api
  registerUserRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/register-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
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
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! login-user api -- done
  loginUserRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/login-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
    }
  },

  //! profile details -- done
  profileDetails: null,
  profileDetailsRequest: async () => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-profile", {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ profileDetails: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! profile details by id -- done
  profileDetailsById: null,
  ProfileDetailsByIdRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-profile-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ profileDetailsById: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! update profile
  profileUpdate: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/update-profile", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! update profile by id
  profileUpdateByIdRequest: async (reqBody, id) => {
    try {
      loadingRequest(true);
      let res = await axios.post(
        baseURL + "/update-profile-by-id/" + id,
        reqBody,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! all profile details -- done
  allProfileDetails: null,
  allProfileDetailsRequest: async (perPage, pageNo) => {
    try {
      loadingRequest(true);
      let res = await axios.get(
        baseURL + "/read-all-profile/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ allProfileDetails: res?.data?.data });
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! delete profile
  deleteProfileRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.delete(baseURL + "/delete-profile/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },
}));

export default UserStore;
