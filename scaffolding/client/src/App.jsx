import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePage from "./pages/HomePage";
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
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  console.warn = () => {};
  console.error = () => {};

  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* categories */}
        <Route
          exact
          path='/create-categories'
          element={
            <PrivateRoute>
              <CreateCategoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/all-categories/:pageNo'
          element={
            <PrivateRoute>
              <AllCategoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/update-categories/:id'
          element={
            <PrivateRoute>
              <UpdateCategoriesPage />
            </PrivateRoute>
          }
        />

        {/* products */}
        <Route
          exact
          path='/create-product'
          element={
            <PrivateRoute>
              <CreateProductPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/all-product/:pageNo'
          element={
            <PrivateRoute>
              <AllProductPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/update-product/:id'
          element={
            <PrivateRoute>
              <UpdateProductPage />
            </PrivateRoute>
          }
        />

        {/* customer */}
        <Route
          exact
          path='/create-customer'
          element={
            <PrivateRoute>
              <CreateCustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/all-customer/:pageNo'
          element={
            <PrivateRoute>
              <AllCustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/update-customer/:id'
          element={
            <PrivateRoute>
              <UpdateCustomerPage />
            </PrivateRoute>
          }
        />

        {/* user */}
        <Route
          exact
          path='/add-user'
          element={
            <PrivateRoute>
              <AddUserPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/all-user/:pageNo'
          element={
            <PrivateRoute>
              <AllUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/view-profile'
          element={
            <PrivateRoute>
              <ViewProfilePage />
            </PrivateRoute>
          }
        />

        {/* orders */}
        <Route
          exact
          path='/create-order'
          element={
            <PrivateRoute>
              <CreateOrderPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/all-order/:pageNo'
          element={
            <PrivateRoute>
              <AllOrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='/view-order/:id'
          element={
            <PrivateRoute>
              <ViewOrderPage />
            </PrivateRoute>
          }
        />

        {/* backup */}
        <Route
          exact
          path='/backup-database'
          element={
            <PrivateRoute>
              <BackupDatabasePage />
            </PrivateRoute>
          }
        />

        {/* login */}
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
