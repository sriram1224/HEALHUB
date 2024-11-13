const Footer = () => {
  return (
    <div>
      <div>
        {/*Left side */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-500 russo-one-regular">
          H E A L H U B
        </span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </p>
      </div>
      <div>
        {/*  Center*/}
        <h1>Company</h1>
        <ul>
          <li>HOME</li>
          <li>ABOUT</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div>{/* Right side*/}</div>
    </div>
  );
};

export default Footer;
