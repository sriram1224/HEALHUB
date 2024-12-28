import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
      className="bg-transparent py-10 cursor-pointer"
      initial="hidden"
      animate={showFooter ? "visible" : "hidden"}
      variants={footerVariants}
    >
      <div className="sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side */}
          <div>
            <span
              onClick={() => navigate("/")}
              className="self-center text-4xl font-bold bg-gradient-to-b from-[#6c382c] via-[#814e33] to-[#9481b3] bg-clip-text text-transparent russo-one-regular"
            >
              H E A L H U B
            </span>
            <p className="mt-4 font-bold bg-gradient-to-b from-[#291f75] to-[#6f0280] bg-clip-text text-transparent">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          {/* Center */}
          <div>
            <h1 className="text-xl font-semibold mb-4">COMPANY</h1>
            <ul className="space-y-2">
              <li
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-300"
              >
                HOME
              </li>
              <li
                onClick={() => navigate("/About")}
                className="hover:text-blue-500 transition duration-300"
              >
                ABOUT
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="hover:text-blue-500 transition duration-300"
              >
                CONTACT
              </li>
              <li
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-300"
              >
                Privacy Policy
              </li>
            </ul>
          </div>
          {/* Right side */}
          <div>
            <h1 className="text-xl font-semibold mb-4">GET IN TOUCH</h1>
            <p className="text-gray-400">+0-000-000-000</p>
            <p className="text-gray-400">google@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          &copy; 2023 HealHub. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;