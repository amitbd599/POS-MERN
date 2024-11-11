import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import CreateCategoriesPage from "./pages/CreateCategoriesPage";

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

        <Route exact path='/sign-in' element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
