import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";


export const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto d-flex gap-2">
                    <Link to="/demo">
                        <button className="btn btn-primary">Check the Context in action</button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/private">
                                <button className="btn btn-warning">Private</button>
                            </Link>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-outline-success">Signup</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-outline-primary">Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};