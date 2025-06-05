import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                sessionStorage.setItem("token", result.token);
                alert("Login exitoso");
                navigate("/private"); // Redirige al área privada
            } else {
                alert(result.msg || "Error en el login");
            }

            reset();
        } catch (error) {
            alert("Error en la conexión");
            console.error("Login error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4" style={{ maxWidth: "400px" }}>
            <h2>Iniciar sesión</h2>
            <input
                {...register("email")}
                className="form-control my-2"
                placeholder="Email"
                type="email"
                required
            />
            <input
                {...register("password")}
                className="form-control my-2"
                placeholder="Contraseña"
                type="password"
                required
            />
            <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
};

export default LoginForm
