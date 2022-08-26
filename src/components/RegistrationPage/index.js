import { useMutation } from "@apollo/client";
import { useState } from "react";
import { QUERY_TO_REGISTER } from "../query/signUp";
import "./index.css";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { loading }] = useMutation(QUERY_TO_REGISTER);

  return (
    <div className="RegistrationPage">
      <div className="regFormDiv">
        <p className="title">Registration</p>
        {loading && <div className="loading"></div>}
        <form className="regForm">
          <input
            placeholder="Login"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              createUser({
                variables: {
                  name: name,
                  email: email,
                  password: password,
                },
              }).then(({ data }) => {
                if (data.signup.token) {
                  sessionStorage.setItem("ACCESS_TOKEN", data.signup.token);
                  window.location = "/";
                }
              });
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
