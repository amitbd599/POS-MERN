import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Invoice from "../components/Invoice";

const ViewOrderPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Invoice' />

        {/* Invoice */}
        <Invoice />
      </MasterLayout>
    </>
  );
};

export default ViewOrderPage;
