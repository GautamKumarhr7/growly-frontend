import React, { useState } from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { loginUser, type LoginData } from "../../services/authServices";
import "./Login.css";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      console.log("Attempting login...");

      const result = await loginUser(form);
      console.log("Login result:", result);

      if (result.token) {
        console.log("Login successful, setting token and auth state...");
        setMessageType("success");
        setMessage(result.message);
        localStorage.setItem("authToken", result.token);

        // Update authentication state and redirect
        setIsAuthenticated(true);
        console.log("Redirecting to home page...");
        window.location.href = "/";
      } else {
        console.log("Login failed:", result.message);
        setMessageType("error");
        setMessage(result.message);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setMessageType("error");
      setMessage(
        err.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" text={loading ? "Logging in..." : "Login"} />
      </form>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
        Don’t have an account?{" "}
        <span
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}
