import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = () => {
  const va1ue = {
    doctors,
  };
  return <AppContext.Provider value={value}>{}</AppContext.Provider>;
};
