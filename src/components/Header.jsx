import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");

  const apiKey = 'AIzaSyCP8DPLtL3Nhs-uKBGiAEmdD_cLAkkOVBA';

  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleStateSelection = (state) => {
    navigate(`/state-news/${encodeURIComponent(state)}`); 
    setShowStates(false);
    setActive(false); 
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
          News Aggregator
        </h3>

        <ul className={active ? "nav-ul flex gap-10 md:gap-12 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-20 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li>
            <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
              Home
            </Link>
          </li>

          <li className="dropdown-li">
            <div className="no-underline font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              Top Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
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
              State News <FontAwesomeIcon className={showStates ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </div>

            <ul className={showStates ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {states.map((state, index) => (
                <li key={index} onClick={() => handleStateSelection(state)}>
                  <div className="flex gap-3 capitalize">
                    {state}
                  </div>
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
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
        </ul>

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
