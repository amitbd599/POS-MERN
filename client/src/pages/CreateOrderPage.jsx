import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateOrder from "../components/CreateOrder";

const CreateOrderPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Create an order' />

        {/* CreateOrder */}
        <CreateOrder />
      </MasterLayout>
    </>
  );
};

export default CreateOrderPage;
