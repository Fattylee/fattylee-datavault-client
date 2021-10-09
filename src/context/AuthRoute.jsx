import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "./auth";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
