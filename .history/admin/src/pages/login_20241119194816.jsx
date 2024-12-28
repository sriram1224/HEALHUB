<div className="text-white text-center mt-6">
  {state === "Admin" ? (
    <p className="text-base">
      <span className="text-gray-300">Switch to</span>
      <span
        className="text-blue-500 font-bold ml-2 cursor-pointer hover:underline transition-all"
        onClick={() => {
          setState("Doctor");
        }}
      >
        Doctor Login
      </span>
    </p>
  ) : (
    <p className="text-base">
      <span className="text-gray-300">Switch to</span>
      <span
        className="text-blue-500 font-bold ml-2 cursor-pointer hover:underline transition-all"
        onClick={() => {
          setState("Admin");
        }}
      >
        Admin Login
      </span>
    </p>
  )}
</div>;
