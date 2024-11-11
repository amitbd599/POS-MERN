import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UpdateProduct from "../components/UpdateProduct";

const UpdateProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Update Product' />

        {/* UpdateProduct */}
        <UpdateProduct />
      </MasterLayout>
    </>
  );
};

export default UpdateProductPage;
