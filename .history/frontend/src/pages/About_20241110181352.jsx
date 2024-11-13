import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="text-white">
      {/* About Us Section */}
      <section className="bg-black py-12">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left - Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src={assets.about_image}
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {/* Right - Text Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <p>
                Welcome to Prescripto, your trusted partner in managing your
                healthcare needs conveniently and efficiently. At Prescripto, we
                understand the challenges individuals face when it comes to
                scheduling doctor appointments and managing their health
                records.
              </p>
              <p>
                Prescripto is committed to excellence in healthcare technology.
                We continuously strive to enhance our platform, integrating the
                latest advancements to improve user experience and deliver
                superior service. Whether youre booking your first appointment
                or managing ongoing care, Prescripto is here to support you
                every step of the way.
              </p>
              <h2 className="text-2xl font-bold text-blue-500">Our Vision</h2>
              <p>
                Our vision at Prescripto is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className=" border border-collapse rounded-lg py-12">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-500">
            Why Choose Us
          </h2>
          <div className="space-y-4">
            <p>
              At Prescripto, we prioritize your health and convenience. Here are
              a few reasons why you should choose us:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Easy and convenient appointment scheduling</li>
              <li>Access to a wide network of trusted healthcare providers</li>
              <li>Secure and confidential health record management</li>
              <li>24/7 customer support to assist you with your needs</li>
              <li>Continuous platform improvements for a better experience</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
