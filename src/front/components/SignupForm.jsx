import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token");

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
						<button className="btn btn-outline-primary">Demo</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-outline-success">Registrarse</button>
					</Link>
					{!token ? (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					) : (
						<button onClick={handleLogout} className="btn btn-danger">Logout</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default SignupForm
