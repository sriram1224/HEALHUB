import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div>
      {/* left */}
      <div>
        <div>
          <p>Book Appointment</p>
          <p> With 100+ Trusted Doctors</p>
        </div>
        <button>Create an Account</button>
      </div>{" "}
      {/* right */}
      <div>
        <img src={assets.appointment_img} alt="" />
      </div>
    </div>
  );
};

export default Banner;
