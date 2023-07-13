import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";

export default function DefaultLayout() {
  const { user, setUser } = useAuth();

  // check if user is logged in or not from server
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("/user");
        if (resp.status === 200) {
          setUser(resp.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }
    })();
  }, []);

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // logout user
  const handleLogout = async () => {
    try {
      const resp = await axios.post("/logout");
      if (resp.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/posts">Post</NavLink>
              </li>
            </ul>
          </div>
          <a
            href="https://www.nusantarainfrastructure.com/"
            className="flex items-center"
          >
            <img
              src="/assets/img/logo.png"
              className="h-6 mr-3 sm:h-9"
              alt="Nusantara Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Nusantara Blog
            </span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/posts">Post</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a onClick={handleLogout} href="#" className="btn">
            LOGOUT
          </a>
        </div>
      </div>
      <main className="container flex justify-center flex-col items-center mt-10">
        <Outlet />
      </main>
    </>
  );
}
