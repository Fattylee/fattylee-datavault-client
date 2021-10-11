import { createContext, useContext, useState } from "react";

interface IStateContext {
  activeItem: string;
  handleItemClick(_: any, obj: { name: string }): void;
}

const StateContext = createContext<IStateContext>({
  handleItemClick() {},
  activeItem: "dataVault",
});

const ActiveLinkProvider = ({ children }: { children: any }) => {
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "dataVault" : pathname.substr(1);
  });

  const handleItemClick = (_e: any, { name }: { name: string }) => {
    setActiveItem(name);
  };

  return (
    <StateContext.Provider value={{ activeItem, handleItemClick }}>
      {children}
    </StateContext.Provider>
  );
};

const useActiveLink = () => useContext(StateContext);

export { useActiveLink, ActiveLinkProvider };
