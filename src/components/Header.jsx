// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  // List of news categories
  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
  
  // List of Indian languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'ur', name: 'اردو' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'gu', name: 'ગુજરાતી' },
  ];

  // Apply theme on body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle between light and dark theme
  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  // Change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false); // Close dropdown after selection
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
          News_Aggregator
        </h3>

        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li>
            <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
              {t('allNews')}
            </Link>
          </li>

          {/* Top Headlines Dropdown */}
          <li className="dropdown-li">
            <div className="no-underline font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              {t('topHeadlines')} <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
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

          {/* Language Switcher Dropdown */}
          <li className="dropdown-li">
            <div className="no-underline font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
              {t('language')} <FontAwesomeIcon className={showLanguageDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </div>

            <ul className={showLanguageDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {languages.map((lang) => (
                <li key={lang.code} onClick={() => changeLanguage(lang.code)}>
                  <span className="flex gap-3 capitalize cursor-pointer">{lang.name}</span>
                </li>
              ))}
            </ul>
          </li>

          {/* Theme Toggle Button */}
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

        {/* Hamburger Menu */}
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
