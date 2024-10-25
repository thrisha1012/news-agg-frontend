import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import Login from "./Login";

function Header() {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false); 
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const apiKey = 'AIzaSyCP8DPLtL3Nhs-uKBGiAEmdD_cLAkkOVBA';

  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleLogin = (userData, token) => {
    setUser(userData); // Store user data in state
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    localStorage.setItem('token', token); // Save the token to localStorage
    setShowLogin(false); // Close the login modal after login
    navigate('/profile'); // Navigate to the profile page after login
  };
  
  const handleStateSelection = (state) => {
    navigate(`/state-news/${encodeURIComponent(state)}`);
    setShowStates(false);
    setActive(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Invalid JSON data:", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Clear user state on logout
    navigate('/'); // Redirect to home
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
    setSearchTerm(''); // Clear search term after navigating
  };
  
  const isLoggedIn = user !== null;

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
          News Aggregator
        </h3>

        <ul className={active ? "nav-ul flex gap-5 md:gap-12 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-10 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li>
            <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
              Home
            </Link>
          </li>

          <li className="dropdown-li">
  <div className="no-underline font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
    CategoryNews <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
  </div>

  <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"} style={{ display: showCategoryDropdown ? 'block' : 'none' }}>
    {categories.map((element, index) => (
      <li key={index} onClick={() => setShowCategoryDropdown(false)}>
        <Link to={`/top-headlines/${element}`} className="flex gap-3 capitalize" onClick={() => setActive(false)}>
          {element}
        </Link>
      </li>
    ))}
  </ul>
</li>


          <li className="dropdown-li">
            <div className="no-underline font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setShowStates(!showStates)}>
              StateNews <FontAwesomeIcon className={showStates ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </div>

            <ul className={showStates ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {states.map((state, index) => (
                <li key={index} onClick={() => handleStateSelection(state)}>
                  <Link to="#" className="flex gap-3 capitalize cursor-pointer">
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                className="search-bar"
                placeholder="Search News"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
          </li>

          <li
            onMouseEnter={() => setShowProfileOptions(true)} // Show options on hover
            onMouseLeave={() => setShowProfileOptions(false)} // Hide options when not hovering
          >
            {isLoggedIn ? ( // Check if user is logged in
              <>
                <Link to="/profile" className="no-underline font-semibold">
                  Profile
                </Link>
                {showProfileOptions && (
                  <button className="no-underline font-semibold" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </>
            ) : (
              <button className="no-underline font-semibold" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </li>
        </ul>

        {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />}

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
