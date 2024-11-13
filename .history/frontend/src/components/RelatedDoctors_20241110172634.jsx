import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = () => {
  const { doctors } = useContext(AppContext);
  return <div></div>;
};

export default RelatedDoctors;
