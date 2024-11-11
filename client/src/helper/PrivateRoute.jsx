import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserStore from "../store/UserStore";
const PrivateRoute = ({ children }) => {
  let { login, isLogin } = UserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/cart" ||
      location.pathname === "/checkout" ||
      location.pathname === "/profile" ||
      location.pathname === "/wishlist"
    ) {
      (async () => {
        await isLogin();
      })();
    }
  }, [location.pathname, isLogin]);

  console.log(login);

  if (login === true) {
    return children;
  } else {
    return navigate("/login", { state: { from: location } });
  }
};

export default PrivateRoute;
