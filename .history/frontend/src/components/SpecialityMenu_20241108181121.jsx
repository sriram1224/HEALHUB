import { SpecialityData } from "../assets/assets";
const SpecialityMenu = () => {
  return (
    <div id="speciality">
      <h1>Find by Speciality</h1>
      <p>
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div>{SpecialityData.map(() => {})}</div>
    </div>
  );
};

export default SpecialityMenu;
