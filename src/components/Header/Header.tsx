import "./Header.scss";

import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__logo cursor-pointer" onClick={navigateToHome}>Movies</div>
      </div>
    </header>
  );
};

export default Header;
