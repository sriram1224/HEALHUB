import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="text-white bg-black min-h-screen">
      {/* Contact Us Section */}
      <section className="py-12">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
            Contact Us
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left - Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src={assets.contact_image}
                alt="Contact Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {/* Right - Contact Details Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-blue-500">
                  Our Office
                </h2>
                <p>00000 Willms Station Suite 000, Washington, USA</p>
                <p>Tel: (000) 000-0000</p>
                <p>Email: greatstackdev@gmail.com</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-blue-500">
                  Careers at Prescripto
                </h2>
                <p>Learn more about our teams and job openings.</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4">
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
