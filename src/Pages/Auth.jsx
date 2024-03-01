import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm";
import { useTokenStore } from "../tokenStore";
import { usePrivStore } from "../privStore";
import "../Auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setBearerToken } = useTokenStore.getState();
  const { setPrivToken } = usePrivStore.getState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, password, onInputChange, onResetForm } = useForm({
    name: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const requestBody = {
      username: name,
      password: password,
    };

    try {
      const loginResponse = await fetch(
        "http://190.113.124.155:9099/Auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.data;
        setBearerToken(token);

        // Obtener datos del usuario después del inicio de sesión
        const userResponse = await fetch(
          `http://190.113.124.155:9099/Usuario/User?user=${name}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const rolId = userData.data.rol;

          // Obtener datos del rol usando el ID del usuario
          const roleResponse = await fetch(
            `http://190.113.124.155:9099/Rol/${rolId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (roleResponse.ok) {
            // Puedes hacer algo con los datos del rol si es necesario
            const roleData = await roleResponse.json();
            const priv = roleData.data.privilegios;
            setPrivToken(priv);

            // Redirigir al usuario a la página principal
            navigate("/", {
              replace: true,
              state: {
                logged: true,
                name,
              },
            });

            // Resetear el formulario
            onResetForm();
          } else {
            const roleError = await roleResponse.json();
            setError(roleError.message || "Error al obtener datos del rol");
          }
        } else {
          const userError = await userResponse.json();
          setError(userError.message || "Error al obtener datos del usuario");
        }
      } else {
        const errorResponse = await loginResponse.json();
        if (errorResponse.isSuccess === false && errorResponse.data === null) {
          setError(errorResponse.message || "Usuario o contraseña incorrectos");
        } else {
          setError(errorResponse.message || "Error en la autenticación");
        }
      }
    } catch (error) {
      setError("Error al realizar la solicitud");
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="loginContainer">
        <h1>StockView</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Cargando...</p>}

        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            required
          />
        </div>

        <button
          className="loginBut"
          type="submit"
          onClick={onLogin}
          disabled={loading}
        >
          <p>Login</p>
        </button>
      </div>
    </div>
  );
}
