import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
