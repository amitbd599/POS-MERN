import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import CreateCategoriesPage from "./pages/CreateCategoriesPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import UpdateCategoriesPage from "./pages/UpdateCategoriesPage";
import CreateProductPage from "./pages/CreateProductPage";
import AllProductPage from "./pages/AllProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import AllCustomerPage from "./pages/AllCustomerPage";
import UpdateCustomerPage from "./pages/UpdateCustomerPage";
import AddUserPage from "./pages/AddUserPage";
import AllUsersPage from "./pages/AllUsersPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import CreateOrderPage from "./pages/CreateOrderPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import BackupDatabasePage from "./pages/BackupDatabasePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path='/' element={<HomePage />} />

        {/* categories */}
        <Route
          exact
          path='/create-categories'
          element={<CreateCategoriesPage />}
        />
        <Route
          exact
          path='/all-categories/:pageNo'
          element={<AllCategoriesPage />}
        />
        <Route
          exact
          path='/update-categories/:id'
          element={<UpdateCategoriesPage />}
        />

        {/* products */}
        <Route exact path='/create-product' element={<CreateProductPage />} />
        <Route exact path='/all-product/:pageNo' element={<AllProductPage />} />
        <Route
          exact
          path='/update-product/:id'
          element={<UpdateProductPage />}
        />

        {/* customer */}
        <Route exact path='/create-customer' element={<CreateCustomerPage />} />
        <Route
          exact
          path='/all-customer/:pageNo'
          element={<AllCustomerPage />}
        />
        <Route
          exact
          path='/update-customer/:id'
          element={<UpdateCustomerPage />}
        />

        {/* user */}
        <Route exact path='/add-user' element={<AddUserPage />} />
        <Route exact path='/all-user/:pageNo' element={<AllUsersPage />} />
        <Route exact path='/view-profile' element={<ViewProfilePage />} />

        {/* orders */}
        <Route exact path='/create-order' element={<CreateOrderPage />} />
        <Route exact path='/all-order' element={<AllOrdersPage />} />
        <Route exact path='/view-order/:id' element={<ViewOrderPage />} />

        {/* backup */}
        <Route exact path='/backup-database' element={<BackupDatabasePage />} />

        {/* login */}
        <Route exact path='/login' element={<LoginPage />} />

        <Route exact path='/sign-in' element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
