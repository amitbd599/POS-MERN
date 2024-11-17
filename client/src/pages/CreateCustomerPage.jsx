import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateCustomer from "../components/CreateCustomer";

const CreateCustomerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Create Customer' />

        {/* CreateCustomer */}
        <CreateCustomer />
      </MasterLayout>
    </>
  );
};

export default CreateCustomerPage;
