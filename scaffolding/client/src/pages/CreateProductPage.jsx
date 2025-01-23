import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateProduct from "../components/CreateProduct";

const CreateProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Create Product' />

        {/* CreateProduct */}
        <CreateProduct />
      </MasterLayout>
    </>
  );
};

export default CreateProductPage;
