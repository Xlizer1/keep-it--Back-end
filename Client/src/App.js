import React, { Component, useEffect, useState } from 'react'
import './App.css';
import Register from "./pages/Register"
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import LIST_URI from './components/LIST_URI';

 const App = () => {
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
      const config = {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      }

      const data = await axios.get(LIST_URI, config);

      setNotes(data.data);
  }

  useEffect(() => {
      fetchNotes();
  }, []);

    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<Home notes={ notes }/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;