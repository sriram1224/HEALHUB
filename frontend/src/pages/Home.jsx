import { motion } from "framer-motion";
import { useEffect } from "react";
import Banner from "../components/Banner";
import Headers from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const sectionVariants = {
  hidden: { opacity: 0, y: 50 }, // Start animation (below and hidden)
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }, // End animation
};


const Home = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  if (!token) {
    navigate("/login");
  }
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".animated-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.classList.add("animate");
        } else {
          section.classList.remove("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <motion.div
        className="animated-section mb-12"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <Headers />
      </motion.div>

      {/* Speciality - Top Doctors - Speciality Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Speciality Section */}
        <motion.div
          className="w-full lg:w-1/2 animated-section flex flex-col justify-center items-center p-4 bg-transparent  rounded-lg"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <SpecialityMenu />
        </motion.div>

        {/* Top Doctors Section */}
        <motion.div
          className="w-full lg:w-1/2 animated-section flex flex-col justify-center items-center p-4   rounded-lg"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <TopDoctors />
        </motion.div>
      </div>

      {/* Banner Section */}
      <motion.div
        className="animated-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <Banner />
      </motion.div>
    </div >
  );
};

export default Home;