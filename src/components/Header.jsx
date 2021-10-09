import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useAuthState } from "../context/auth";
import { APIClient } from "../utils/APIClient";

export const Header = () => {
  const { user, loading, logout } = useAuthState();
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "dataVault" : pathname.substr(1);
  });

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const handleLogout = async () => {
    try {
      await APIClient.get("/auth/logout");
      logout();
    } catch (error) {
    } finally {
    }
  };
  const authLinks = (
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        icon="globe"
        as={Link}
        to="/"
        name="dataVault"
        active={activeItem === "dataVault"}
        onClick={handleItemClick}
      />
      {!loading ? (
        <Menu.Menu position="right">
          <Menu.Item name={user?.firstName} />
          <Menu.Item name="logout" as={Link} to="/" onClick={handleLogout} />
        </Menu.Menu>
      ) : null}
    </Menu>
  );

  const guestLinks = (
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        icon="globe"
        as={Link}
        to="/"
        name="dataVault"
        active={activeItem === "dataVault"}
        onClick={handleItemClick}
      />
      {!loading ? (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/register"
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      ) : null}
    </Menu>
  );

  return user ? authLinks : guestLinks;
};
