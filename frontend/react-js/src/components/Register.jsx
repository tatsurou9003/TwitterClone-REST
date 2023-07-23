import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ユーザー登録
      const registerResponse = await axios.post(
        "http://localhost:8000/users/register/",
        formData
      );

      if (registerResponse.status === 201) {
        // 登録に成功したら、JWTを取得
        const authResponse = await axios.post(
          "http://localhost:8000/authen/jwt/create/",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // JWTをstateに保存
        // setToken(authResponse.data.access);

        // JWTをlocalStorageなどに保存して、後のリクエストに使用
        localStorage.setItem("token", authResponse.data.access);

        navigate("/home");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};
