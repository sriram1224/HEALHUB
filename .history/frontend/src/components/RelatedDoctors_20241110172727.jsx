import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = () => {
  const { doctors } = useContext(AppContext);
  const [reldocs, setRelDoc] = useState([]);

  return <div></div>;
};

export default RelatedDoctors;
