import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateCategories from "../components/CreateCategories";

const CreateCategoriesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Create Categories' />

        {/* CreateCategories */}
        <CreateCategories />
      </MasterLayout>
    </>
  );
};

export default CreateCategoriesPage;
