import AboutUs from "../modal/AboutUs";
import ContactUs from "../modal/ContactUs";
import Privacy from "../modal/Privacy";

const Footer = ({ supabase }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between p-4">
        <div>
          <AboutUs />
        </div>

        <div>
          <ContactUs supabase={supabase} />
        </div>

        <div>
          <Privacy />
        </div>
      </div>
    </>
  );
};

export default Footer;
