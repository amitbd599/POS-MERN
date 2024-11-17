import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllUsers from "../components/AllUsers";

const AllUsersPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All user' />

        {/* AllUsers */}
        <AllUsers />
      </MasterLayout>
    </>
  );
};

export default AllUsersPage;
