import { useMutation } from "@apollo/client";
import { useState } from "react";
import { QUERY_TO_LOGIN } from "../query/signIn";
import "./index.css";

export default function LoginnPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { loading, error }] = useMutation(QUERY_TO_LOGIN);
  if (error) {
    alert(error);
  }

  return (
    <div className="RegistrationPage">
      <div className="regFormDiv">
        <p className="title">Login</p>
        {loading && <div className="loading"></div>}
        <form className="regForm">
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
                  email: email,
                  password: password,
                },
              }).then(({ data }) => {
                if (data.login.token) {
                  sessionStorage.setItem("ACCESS_TOKEN", data.login.token);
                  window.location = "/";
                }
              });
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
