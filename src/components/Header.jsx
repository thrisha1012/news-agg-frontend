import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import countries from './countries';

function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"]

    useEffect(()=>{
        document.body.className=theme;
    },[theme])

    function toggleTheme(){
        if(theme==="light-theme"){
            SVGTextPathElement("dark-theme")
        }
        else{
            SVGTextPathElement("light-theme")
        }
    }

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
                <h3 className="realtive heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 md-5"></h3>
                <span className="logo">
                    <img src="" alt="New_APP" />
                </span>
                <ul className={active ? "nav-ul flex gap-l1 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end":""}>
                    <li>
                        <Link className="no-underline font-semibold" to="/" onClick={() => setAcTIVE(!active)}>
                            All News
                        </Link>
                    </li>
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCategoryDropdown(false); }}>
                            Top-Headlines
                        </Link>
                    </li>
                    <ul className={showCategoryDropdown?"dropdown p-2 show-dropdown" :"dropdown p-2"}>
                        {Countries.map((element,index)=>(
                            <li key={index} onClick={()=>setShowCategoryDropdown(!showCoutryDropdown)}>
                            <Link to={'/country/${element?.iso_2_alpha}'} className="flex gap-3" onClick={()=>{setActive(!active)}}></Link>
                                <img src="{element?.png" srcSet={'https://flagcdn.com/32x24/${element:.iso_2_alpha}.png 2x'} alt="{element?.countryName}" />
                                <span>
                                    {element?.countryName}
                                </span>
                            </li>
                        )
                        )}
                        <li></li>
                    </ul>
                    <li>
                    <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
                        <input type="checkbox" class="checkbox" id="checkbox" />
                        <label for="checkbox" class="checkbox-label">
                            <i class="fas fa-moon"></i>
                            <i class="fas fa-sun"></i>
                            <span class="ball"></span>
                        </label>
                    </Link>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;