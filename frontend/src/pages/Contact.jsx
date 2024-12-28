import { useEffect } from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      {/* Contact Us Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto px-4 text-[#EDE8F5] sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-8 text-center bg-gradient-to-b from-[#6c382c]  to-[#7620ff] bg-clip-text text-transparent font-bold">
            Contact Us
          </h1>
          <div className="flex flex-col md:flex-row border-2 border-[#421984] items-center rounded-lg gap-10">
            {/* Left - Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src={assets.contact_image}
                alt="Contact Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {/* Right - Contact Details Section */}
            <div className="w-full md:w-1/2 mx-10  space-y-4">
              <div className=" p-6 bg-gradient-to-r from-[#6f5598] to-[#123248] rounded-lg shadow-md">
                <h2 className="text-2xl  font-bold mb-4 text-[#EDE8F5]">
                  Our Office
                </h2>
                <p>00000 Willms Station Suite 000, Washington, USA</p>
                <p>Tel: (000) 000-0000</p>
                <p>Email: google@gmail.com</p>
              </div>
              <div className=" p-6 bg-gradient-to-r from-[#6f5598] to-[#123248] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#EDE8F5]">
                  Careers at Prescripto
                </h2>
                <p>Learn more about our teams and job openings.</p>
                <button className="bg-gradient-to-r from-[#6c382c9e] to-[#35087d] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4">
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
