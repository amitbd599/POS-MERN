import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllCategories from "../components/AllCategories";

const AllCategoriesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='All Categories' />

        {/* AllCategories */}
        <AllCategories />
      </MasterLayout>
    </>
  );
};

export default AllCategoriesPage;
