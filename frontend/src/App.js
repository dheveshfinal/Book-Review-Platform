import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login"; 
import Dashboard from "./components/Dashboard";
import Addbook from "./components/Addbook";
import Addbooks from "./components/AddUserBook"
import ViewBook from "./components/ViewBooks"
import ReviewBook from "./components/ReviewBooks"
import ViewMyRating from "./components/ViewMyRatings"
import ViewallRating from "./components/ViewAllRating"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id/:name" element={<Dashboard/>}/>
        <Route path="/addbook/:id" element={<Addbook/>}/>
        <Route path="/addbooks/:id" element={<Addbooks/>}/>
        <Route path="/viewbooks" element={<ViewBook/>}/>
        <Route path="/reviewbook/:id" element={<ReviewBook/>}/>
        <Route path="/viewrating/:id" element={<ViewMyRating/>}/>
        <Route path="/viewallreview" element={<ViewallRating/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
