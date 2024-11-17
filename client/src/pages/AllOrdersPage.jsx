import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllOrders from "../components/AllOrders";

const AllOrdersPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All orders' />

        {/* AllOrders */}
        <AllOrders />
      </MasterLayout>
    </>
  );
};

export default AllOrdersPage;
