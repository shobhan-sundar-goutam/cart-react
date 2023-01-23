import { createContext, useContext, useState } from "react";
import data from "./data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(data);

  const value = { products };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppContext;
