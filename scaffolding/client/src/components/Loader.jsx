import React from "react";
import LoadingStore from "../store/LoadingStore";

const Loader = () => {
  let { loading } = LoadingStore();

  return (
    <div className={`loader__inner ${loading && "active"}`}>
      <div className='mover'></div>
    </div>
  );
};

export default Loader;
