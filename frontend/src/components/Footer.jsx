import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="bg-transparent py-8 md:py-10 cursor-pointer"
      initial="hidden"
      animate={showFooter ? "visible" : "hidden"}
      variants={footerVariants}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left side */}
          <div className="flex flex-col items-start">
            <span
              onClick={() => navigate("/")}
              className="self-center text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#6c382c] via-[#814e33] to-[#9481b3] bg-clip-text text-transparent russo-one-regular mb-2"
            >
              H E A L H U B
            </span>
            <p className="mt-3 text-sm md:text-base font-medium bg-gradient-to-b from-[#291f75] to-[#6f0280] bg-clip-text text-transparent leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s.
            </p>
            <div className="flex mt-4 space-x-4">
              <FaFacebook className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer transition-colors duration-300" />
              <FaTwitter className="text-blue-400 hover:text-blue-600 text-xl cursor-pointer transition-colors duration-300" />
              <FaInstagram className="text-pink-600 hover:text-pink-800 text-xl cursor-pointer transition-colors duration-300" />
              <FaLinkedin className="text-blue-700 hover:text-blue-900 text-xl cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          {/* Center */}
          <div className="mt-6 sm:mt-0">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 border-gray-200 inline-block">COMPANY</h1>
            <ul className="space-y-3 mt-3">
              <li
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-300 flex items-center space-x-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>HOME</span>
              </li>
              <li
                onClick={() => navigate("/About")}
                className="hover:text-blue-500 transition duration-300 flex items-center space-x-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>ABOUT</span>
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="hover:text-blue-500 transition duration-300 flex items-center space-x-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>CONTACT</span>
              </li>
              <li
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-300 flex items-center space-x-1 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>Privacy Policy</span>
              </li>
            </ul>
          </div>
          {/* Right side */}
          <div className="mt-6 md:mt-0">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 border-gray-200 inline-block">GET IN TOUCH</h1>
            <div className="space-y-3 mt-3">
              <p className="text-gray-600 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+0-000-000-000</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>google@gmail.com</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Health Street, Medical City</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-6 text-center text-gray-500 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} HealHub. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with ❤️ for better healthcare</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
