import { create } from "zustand";

const LoadingStore = create((set) => ({
  loading: false,
  activeRequests: 0, // Tracks active API calls

  loadingRequest: (isLoading) =>
    set((state) => {
      const updatedRequests =
        isLoading === true
          ? state.activeRequests + 1
          : state.activeRequests - 1;

      return {
        activeRequests: updatedRequests,
        loading: updatedRequests > 0, // Set `loading` based on active requests
      };
    }),
}));

export default LoadingStore;
