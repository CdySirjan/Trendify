import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

const App: React.FC = () => {
  // ✅ For frontend-only demo, we’ll just manage login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <Login setToken={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Navbar setToken={() => setIsLoggedIn(false)} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
