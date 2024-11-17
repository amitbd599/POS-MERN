import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUser from "../components/AddUser";

const AddUserPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Add user' />

        {/* AddUser */}
        <AddUser />
      </MasterLayout>
    </>
  );
};

export default AddUserPage;
