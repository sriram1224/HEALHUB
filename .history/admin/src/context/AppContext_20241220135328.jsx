import { createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const slotDateFormat = (slotDate) => {
    const dateArray = SlotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const value = {
    calculateAge,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContextProvider };
export default AppContextProvider;
