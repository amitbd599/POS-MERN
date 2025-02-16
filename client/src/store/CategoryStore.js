import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();
const CategoryStore = create((set) => ({
  //! create category api
  categoryCreateRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/create-categories", reqBody, {
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

  //! update category by id
  categoryUpdateByIdRequest: async (reqBody, id) => {
    try {
      loadingRequest(true);
      let res = await axios.post(
        baseURL + "/update-categories/" + id,
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

  //! all category api
  allCategory: [],
  allCategoryRequest: async () => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/all-categories", {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ allCategory: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! category details by id -- done
  categoryDetailsByIdRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-categories-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! delete category api
  deleteCategoryRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.delete(baseURL + "/delete-categories/" + id, {
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

export default CategoryStore;
