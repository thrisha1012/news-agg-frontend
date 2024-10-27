import React from "react";
import YouTubeNews from "./YouTubeNews"; 
import AllNews from "./AllNews"; 

function HomePage() {
  return (
    <div className="home-page">
      <YouTubeNews />
      <AllNews />
    </div>
  );
}

export default HomePage;
