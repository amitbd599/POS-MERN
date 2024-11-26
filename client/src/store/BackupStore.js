import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();

const BackupStore = create((set) => ({
  loading: false,

  //! create import api
  importCreateRequest: async (formData) => {
    try {
      // set({ loading: true });
      loadingRequest(true);
      let res = await axios.post(baseURL + "/import-data", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        // set({ loading: false });
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        // set({ loading: false });
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },
}));

export default BackupStore;
