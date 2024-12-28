import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [available, setAvailable] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpecialty] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const { backendurl, atoken } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", docImg);
    formdata.append("name", name.trim());
    formdata.append("email", email.trim());
    formdata.append("password", password.trim());
    formdata.append("speciality", speciality);
    formdata.append("degree", degree.trim());
    formdata.append("experience", experience);
    formdata.append("about", about.trim());
    formdata.append("available", available);
    formdata.append("fees", fees);
    formdata.append(
      "address",
      JSON.stringify({ line1: address1, line2: address2 })
    );
    formdata.append("date", Date.now());

    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/add-doctor`,
        formdata,
        {
          headers: { atoken },
        }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setAvailable(true);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpecialty("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      }
    } catch (error) {
      console.error(
        "Error Response:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen flex items-center text-[#6523a7]  justify-center px-4">
      <form
        action=""
        className="w-full  border border-blue-500 p-8 rounded-lg shadow-lg space-y-8"
      >
        <h2 className="text-3xl font-semibold text-[#6523a7]  text-center">
          Add Doctor
        </h2>

        <div className="mb-6 flex justify-center">
          <label
            htmlFor="doc-img"
            className="block border-2 border-dashed  rounded-lg p-6 text-[#6523a7] cursor-pointer border-blue-500 transition duration-200"
          >
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-24 h-24 mx-auto mb-3 rounded-full"
            />
            <input
              type="file"
              id="doc-img"
              className="hidden"
              onChange={(e) => setDocImg(e.target.files[0])}
            />
            <p className="text-[#6523a7]">Upload Doctor's Picture</p>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm  mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                required
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm 0 mb-2">Doctor Email</label>
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm  mb-2">Doctor Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm  mb-2">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm  mb-2">Fees</label>
              <input
                type="number"
                placeholder="Doctor's Fees"
                required
                value={fees}
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Specialty</label>
              <select
                value={speciality}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm  mb-2">Education</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Doctor's Education"
                required
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm  mb-2">Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address Line 1"
                required
                className="w-full mb-3 px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address Line 2"
                required
                className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="font-bold mb-2">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about yourself"
            rows={5}
            className="w-full px-4 py-3 bg-[#EDE8F5] text-black rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:ring-2 focus:ring-blue-600"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
