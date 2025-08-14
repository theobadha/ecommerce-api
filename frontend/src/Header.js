import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    let userType = "buyer";
    try {
      userType = localStorage.getItem("userType") || "buyer";
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
    } catch (e) {
      // noop - storage may be unavailable in some environments
    }
    const redirectPath = userType === "seller" ? "/login/seller" : "/login/buyer";
    navigate(redirectPath);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">Ecommerce</div>
        <nav className="site-header__nav">
          <button className="site-header__logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;


