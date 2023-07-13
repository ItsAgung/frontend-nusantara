import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/assets/img/logo.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Hai {user.name}!</h1>
            <p className="py-6">
              Selamat datang di Nusantara Blog, Silahkan eksplore web ini dengan
              ceria ya!
            </p>
            <Link to="/posts">
              <button className="btn btn-primary">Post Sesuatu!</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
