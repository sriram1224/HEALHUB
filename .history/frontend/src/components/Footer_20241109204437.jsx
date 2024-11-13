import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-10 cursor-pointer">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side */}
          <div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-500 russo-one-regular">
              H E A L H U B
            </span>
            <p className="mt-4 text-gray-400">
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
            <p className="text-gray-400">kasukurthibhargav@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          &copy; 2023 HealHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
