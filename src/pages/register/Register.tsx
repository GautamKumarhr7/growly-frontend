import React, { useState } from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { registerUser, type RegisterData } from "../../services/authServices";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    role: "regular",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(form);
    setMessage(result.message || "Registration attempt completed");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <div className="input-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="regular">Regular</option>
          </select>
        </div>

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

        <Button type="submit" text="Register" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
