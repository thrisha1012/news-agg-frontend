import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

import TopHeadlines from "./components/TopHeadlines";
import SearchResults from "./components/SearchResults";
import StateNews from "./components/StateNews";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/state-news/:stateName" element={<StateNews />} />
          <Route path="/search/:query" element={<SearchResults />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
