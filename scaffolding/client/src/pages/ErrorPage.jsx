import React from "react";
import Error from "../components/Error";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";

const ErrorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Error / 404' />

        <Error />
      </MasterLayout>
    </>
  );
};

export default ErrorPage;
