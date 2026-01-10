import React, { useState, useEffect } from "react";
import {
  LoginContainer,
  LoginBox,
  LoginCompanyName,
  LoginForm,
  LoginFormBox,
  LoginFormPassword,
  LoginFormButton,
  LoginImageBox,
  LoginFormUserName,
  ErrorMsg,
  LoginImage,
} from "./styledComponents";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import fruitBasketGif from "/fruit basket-amico.svg";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("saFruitsToken");
    if (token) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();
  const fixedEmail = "anilkumar.gantela77@gmail.com"; // fixed email

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://backend-zmoa.onrender.com/admin/login",
        { email: fixedEmail, password }
        // allow cookies
      );

      // Store JWT token in cookie (expires in 6 days)
      const token = response.data.admitoken;
      Cookies.set("saFruitsToken", token, {
        expires: 6,
        secure: window.location.protocol === "https:", // secure only in HTTPS
        sameSite: "Strict",
      });

      navigate("/"); // redirect after login
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginImageBox>
          <LoginImage src={fruitBasketGif} alt="Fruit Basket Animation" />
        </LoginImageBox>
        <LoginFormBox>
          <LoginCompanyName>SA FRUITS</LoginCompanyName>
          <LoginForm onSubmit={handleSubmit}>
            {error && <ErrorMsg>{error}</ErrorMsg>}

            <LoginFormUserName
              type="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <LoginFormPassword
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <LoginFormButton type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </LoginFormButton>
          </LoginForm>
        </LoginFormBox>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
