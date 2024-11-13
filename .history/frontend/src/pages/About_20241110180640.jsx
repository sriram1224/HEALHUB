import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="text-white">
      <h1> About Us </h1>
      {/* left -Image Section */}
      <div>
        {/* image */}
        <img src={assets.about_image} />
      </div>
      {/* right section */}

      <div>
        <p>
          Welcome to Prescripto, your trusted partner in managing your
          healthcare needs conveniently and efficiently. At Prescripto, we
          understand the challenges individuals face when it comes to scheduling
          doctor appointments and managing their health records.
        </p>
        <p>
          Prescripto is committed to excellence in healthcare technology. We
          continuously strive to enhance our platform, integrating the latest
          advancements to improve user experience and deliver superior service.
          Whether youre booking your first appointment or managing ongoing care,
          Prescripto is here to support you every step of the way.
        </p>
        <p>Our Vision</p>
        <p>
          Our vision at Prescripto is to create a seamless healthcare experience
          for every user. We aim to bridge the gap between patients and
          healthcare providers, making it easier for you to access the care you
          need, when you need it.
        </p>
      </div>
      {/* why choose us */}
      <h1>WHY CHOOSE US</h1>
      <div>
        <h1>EFFICIENCY:</h1>
        <p>
          Streamlined appointment scheduling that fits into your busy lifestyle.
        </p>
      </div>
      <div>
        <h1>CONVENIENCE:</h1>
        <p>
          Access to a network of trusted healthcare professionals in your area.
        </p>
      </div>
      <div>
        <h1>PERSONALIZATION:</h1>
        <p>
          Tailored recommendations and reminders to help you stay on top of your
          health.
        </p>
      </div>
    </div>
  );
};

export default About;
