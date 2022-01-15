import React, { Component } from 'react'
import './App.css';
import Register from "./pages/Register"
import User from './pages/User';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/user" element={<User/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
