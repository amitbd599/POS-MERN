import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewProfile from "../components/ViewProfile";

const ViewProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='View Profile' />

        {/* ViewProfile */}
        <ViewProfile />
      </MasterLayout>
    </>
  );
};

export default ViewProfilePage;
