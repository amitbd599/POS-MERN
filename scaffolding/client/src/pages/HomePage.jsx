import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoard from "../components/DashBoard";

const HomePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='AI' />

        {/* DashBoardLayerTwo */}
        <DashBoard />
      </MasterLayout>
    </>
  );
};

export default HomePage;
