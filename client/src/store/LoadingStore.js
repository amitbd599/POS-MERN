import { create } from "zustand";

const LoadingStore = create((set) => ({
  loading: false,

  //! create import api
  loadingRequest: async (data) => {
    console.log(data);

    set({ loading: data });
  },
}));

export default LoadingStore;
