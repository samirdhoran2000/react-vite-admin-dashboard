// src/App.js
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UploadFile from "./components/UploadFile";
// import CustomTable from "./components/CustomTable";
import "./App.css";
  import "react-toastify/dist/ReactToastify.css";

// const Home = () => <div>Home Page</div>;
const Users = () => <div>Users Page</div>;
const Settings = () => <div>Settings Page</div>;

function App() {
  return (<>
    <Router>
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/uploadFile" element={<UploadFile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
<ToastContainer />
    </Router>
  </>
  );
}

export default App;
