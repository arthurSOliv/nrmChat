import React from "react";
import axios from "axios";
import makeToast from "../Toaster";

const RegisterPage = (props) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios.post("http://localhost:3333/user/register", {
      username,
      password,
    }).then(response => {
      console.log(response.data);
      makeToast("Success", response.data.message);
      props.history.push('/login');
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
        Registration
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
        <button onClick={registerUser}>Sign up</button>
      </div>
    </div>
  );
}

export default RegisterPage;
