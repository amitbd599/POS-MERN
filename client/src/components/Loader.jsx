import React from "react";
import UserStore from "../store/UserStore";

const Loader = () => {
  let { loading } = UserStore();
  return (
    <div className={`loader__inner ${loading && "active"}`}>
      <div className='mover'></div>
    </div>
  );
};

export default Loader;
