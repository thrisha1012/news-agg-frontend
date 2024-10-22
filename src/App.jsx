// src/App.js
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import SearchResults from "./components/SearchResults";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import YouTubeNews from "./components/YouTubeNews";
import './i18n'; // Import the i18n configuration

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <YouTubeNews />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/search/:query" element={<SearchResults />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
