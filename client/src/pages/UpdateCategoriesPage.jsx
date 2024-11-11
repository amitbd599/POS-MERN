import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UpdateCategories from "../components/UpdateCategories";

const UpdateCategoriesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Update Categories' />

        {/* AllCategories */}
        <UpdateCategories />
      </MasterLayout>
    </>
  );
};

export default UpdateCategoriesPage;
