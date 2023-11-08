import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/">
      <img className="logo links" src={logo} alt="Логотип" />
    </Link>
  );
};

export default Logo;
