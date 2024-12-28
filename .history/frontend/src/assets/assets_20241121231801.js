import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [degree, setDegree] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", fees);
    formData.append("specialty", specialty);
    formData.append("degree", degree);
    formData.append(
      "address",
      JSON.stringify({ line1: addressLine1, line2: addressLine2 })
    );
    formData.append("about", about);
    formData.append("image", image);

    console.log("Form Data:", formData);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success("Doctor added successfully!");
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx range
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        toast.error(error.response.data.message || "Failed to add doctor");
      } else if (error.request) {
        // Request was sent but no response was received
        console.error("Request Error:", error.request);
        toast.error("No response from server");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-gradient-to-br from-gray-800 to-black border border-gray-400 p-8 rounded-xl"
      >
        <div className="mb-8">
          <p className="text-4xl font-extrabold text-center text-white tracking-wide">
            Add Doctor
          </p>
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Experience
          </label>
          <input
            onChange={(e) => setExperience(e.target.value)}
            type="text"
            value={experience}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Fees
          </label>
          <input
            onChange={(e) => setFees(e.target.value)}
            type="number"
            value={fees}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Specialty
          </label>
          <input
            onChange={(e) => setSpecialty(e.target.value)}
            type="text"
            value={specialty}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Degree
          </label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            value={degree}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Address Line 1
          </label>
          <input
            onChange={(e) => setAddressLine1(e.target.value)}
            type="text"
            value={addressLine1}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Address Line 2
          </label>
          <input
            onChange={(e) => setAddressLine2(e.target.value)}
            type="text"
            value={addressLine2}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            About
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Image
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddDoctor;
