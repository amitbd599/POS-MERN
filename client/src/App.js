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
        <Route exact path='/all-categories' element={<AllCategoriesPage />} />
        <Route
          exact
          path='/update-categories/:id'
          element={<UpdateCategoriesPage />}
        />

        {/* products */}
        <Route exact path='/create-product' element={<CreateProductPage />} />
        <Route exact path='/all-product' element={<AllProductPage />} />
        <Route
          exact
          path='/update-product/:id'
          element={<UpdateProductPage />}
        />

        <Route exact path='/sign-in' element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
