import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllProducts from "../components/AllProducts";

const AllProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All Products' />

        {/* AllProducts */}
        <AllProducts />
      </MasterLayout>
    </>
  );
};

export default AllProductPage;
