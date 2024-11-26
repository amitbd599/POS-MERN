import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();

const DashboardStore = create((set) => ({
  // get the dashboard data
  allDashboardDataRequest: async () => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/dashboard-data", {
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
}));

export default DashboardStore;
