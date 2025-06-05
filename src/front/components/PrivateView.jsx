import React, { useEffect, useState } from "react";

export const PrivateView = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPrivate = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setMessage("No estás autenticado");
                return;
            }

            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage(data.msg);
                } else {
                    setMessage(data.msg || "Acceso denegado");
                }
            } catch (error) {
                setMessage("Error al acceder");
            }
        };

        fetchPrivate();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Vista privada</h2>
            <p>{message}</p>
        </div>
    );
};

export default PrivateView