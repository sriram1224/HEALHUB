import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-white">
        {/* Contact Us */}
        <div>
          <h1>Contact Us</h1>
        </div>
        {/* image */}
        <img src={assets.contact_image} alt="" />
        <div>
          {/* our Office */}
          <div>
            <h1>OUR OFFICE</h1>
            <p>00000 Willms Station Suite 000, Washington, USA</p>
            <p>Tel: (000) 000-0000 Email: greatstackdev@gmail.com</p>
          </div>
          <h1>CAREERS AT PRESCRIPTO</h1>
          <p>Learn more about our teams and job openings.</p>
          <button>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
