import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllCustomers from "../components/AllCustomers";

const AllCustomerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All Customer' />

        {/* AllCustomers */}
        <AllCustomers />
      </MasterLayout>
    </>
  );
};

export default AllCustomerPage;
