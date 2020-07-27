import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const LoginPage = (props) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const logUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios.post("http://localhost:3333/user/login", {
      username,
      password,
    }).then(response => {
      console.log(response.data);
      makeToast("Success", response.data.message);
      localStorage.setItem("CC_Token", response.data.token);
      props.history.push('/dashboard');
      props.setupSocket();
    }).catch(err => {
      if(
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
      makeToast("Error", err.response.data.message);
    });
  }

  return (
    <div className="card">
      <div className="cardHeader">
        Login
      </div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Type your username" ref={usernameRef} />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Type your password" ref={passwordRef} />
        </div>
        <button onClick={logUser}>Sign in</button>
        <Link to={"/register"}>
          <div className="join">Join</div>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
