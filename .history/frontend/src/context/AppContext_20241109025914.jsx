import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const va1ue = {
    doctors,
  };
    return <AppContext.Provider >{
      {props.children}
  }</AppContext.Provider>;
};
