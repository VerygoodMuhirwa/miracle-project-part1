import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loggedActions } from "../store/slices/LoggedInSlice";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };
  const isLoggedIn = useSelector((state) => state.logged.loggedIn);
  const userName = useSelector((state) => state.logged.username);

  const handleSignOut = () => {
    dispatch(loggedActions.signOut());
    navigate("/login")
  };

  return (
    <div>
      <div className="bg-white flex flex-row  justify-between items-center px-24 border border-b-1 py-2">
        <div>
          <img
            src="/assets/logoDark.png"
            alt="company logo"
            className="object-contain w-12 h-12 hover:cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Show "Login" button when isLoggedIn is false and pathname is "/" */}
        {!isLoggedIn && location.pathname === "/" && (
          <Link
            to="/login"
            className="flex justify-center items-center rounded-xl border-2 border-[333] px-5 py-1"
          >
            Login
          </Link>
        )}

        {isLoggedIn && (
          <>
            <div className="relative">
              <div
                className="flex flex-row gap-4 items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src="/assets/user.png"
                  alt="user profile"
                  className="objec-contain"
                />
                <p>{userName}</p>
                <img
                  src={
                    showDropdown ? "/assets/arrow2.png" : "/assets/arrow1.png"
                  }
                  alt="drop down"
                  className="object-contain"
                />
              </div>
              {showDropdown && (
                <div className="absolute top-[3.4em] right-0 bg-white border border-gray-300 p-4 rounded-lg shadow-md w-48  z-50">
                  {/* Dropdown items */}
                  <div className="flex flex-col gap-4 w-full">
                    <button>
                    <Link to="/profile" className="hover:text-[#222] hover:opacity-50" >
                      Profile
                    </Link>
                    </button>
         
                    <hr />
                    <button
                      className="hover:text-[#222] hover:opacity-50"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;