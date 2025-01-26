import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserStore from "../store/UserStore";
const PrivateRoute = ({ children }) => {
  let { verifyAuthRequest } = UserStore();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    (async () => {
      try {
        let result = await verifyAuthRequest(); // verify api call
        if (result) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        setIsLogin(false);
      } finally {
        setLoading(false); // Set loading to false after verification
      }
    })();
  }, [verifyAuthRequest]);

  if (loading) {
    return (
      <div className={`loader__inner active`}>
        <div className='mover'></div>
      </div>
    );
  }

  return isLogin ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
