import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UpdateCustomer from "../components/UpdateCustomer";

const UpdateCustomerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Update Customer' />

        {/* UpdateCustomer */}
        <UpdateCustomer />
      </MasterLayout>
    </>
  );
};

export default UpdateCustomerPage;
