import React from "react";
import UserStore from "../store/UserStore";
import LoadingStore from "../store/LoadingStore";

const Loader = () => {
  // let { loading } = UserStore();
  let { loading } = LoadingStore();

  console.log(loading);

  return (
    <div className={`loader__inner ${loading && "active"}`}>
      <div className='mover'></div>
    </div>
  );
};

export default Loader;
