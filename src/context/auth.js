import { createContext, useEffect, useReducer } from "react";
import { APIClient } from "../utils/APIClient";
import { useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  user: null,
  login: (userData) => null,
  logout: () => null,
});

const reducer = (
  state = { user: null, loading: true, isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, loading: false, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const getInitialState = () => {
  const initialState = { user: null, loading: true, isAuthenticated: false };

  return initialState;
};

const AuthProvider = (props) => {
  const [{ user, isAuthenticated, loading }, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );

  const login = (userData) => dispatch({ type: "LOGIN", payload: userData });
  const logout = () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    APIClient.get("/auth/me")
      .then(({ data }) => {
        login(data);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, loading }}
      {...props}
    />
  );
};

const useAuthState = () => useContext(AuthContext);

export { useAuthState, AuthProvider };
