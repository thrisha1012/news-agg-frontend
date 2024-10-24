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

  const handleLogin = (userData) => {
    setUser(userData); // Assuming userData is the logged-in user's data
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    setShowLogin(false); // Close the login modal after login
  };
  
  const handleStateSelection = (state) => {
    navigate(`/state-news/${encodeURIComponent(state)}`);
    setShowStates(false);
    setActive(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Set user state if logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Clear user state on logout
    navigate('/'); // Redirect to home
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.trim() === "") return;
  //   navigate(`/search/${encodeURIComponent(searchTerm)}`);
  // };
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

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {categories.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                  <Link to={`/top-headlines/${element}`} className="flex gap-3 capitalize" onClick={() => setActive(!active)}>
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
                  <Link to="#" className="flex gap-3 capitalize cursor-pointer"> {/* Ensure consistent styling */}
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li >
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

          <li>
  {user ? ( // Check if user is logged in
    <Link to="/profile" className="no-underline font-semibold">
      Profile
    </Link>
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
