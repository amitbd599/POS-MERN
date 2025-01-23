import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BackupDatabase from "../components/BackupDatabase";

const BackupDatabasePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Export / Import Database' />

        {/* BackupDatabase */}
        <BackupDatabase />
      </MasterLayout>
    </>
  );
};

export default BackupDatabasePage;
