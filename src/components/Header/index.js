import "./index.css";
import logo from "../../assets/img/Logo.png";

export default function Header() {
  const userAuthorized = sessionStorage.getItem("ACCESS_TOKEN");
  return (
    <div className="Header">
      <div className="container">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>

        {!userAuthorized ? (
          <div className="HeaderNavElements">
            {" "}
            <a href="/login" className="HeaderAuthBtn">
              Login
            </a>
            <a href="/registration" className="HeaderRegBtn">
              Sign Up
            </a>{" "}
          </div>
        ) : (
          <div className="HeaderNavElements">
            <a href="/notReady" className="HeaderAuthBtn">
              Profile
            </a>
            <a
              href="/"
              className="HeaderRegBtn"
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.clear();
                window.location.reload();
              }}
            >
              Exit
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
